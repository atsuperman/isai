export class RadioPlayer {
    constructor(songList) {
        this.songList = songList;
        this.audio = new Audio();
        this.currentSongIndex = 0;
        this.isPlaying = false;
        
        // Sync Variables
        this.syncOffset = 0;
        this.serverTime = null;
        this.syncInterval = null;
        
        // Radio Logic Variables
        this.songStartTime = null; // When the current song started (Server Time)
        this.totalDuration = 0;    // Duration of current song
        
        // Listeners
        this.stateListeners = [];
        this.songListeners = [];
        this.playingListeners = [];
        
        // Config
        this.SYNC_INTERVAL_MS = 1000;
        this.PLAY_DELAY_MS = 2000;
        this.MAX_TIME_DIFF_MS = 500;
    }

    async init() {
        await this.syncTime();
        this.startSyncLoop();
        this.setupAudioEvents();
        this.updateState();
    }

    async syncTime() {
        try {
            const response = await fetch('https://worldtimeapi.org/api/ip');
            const data = await response.json();
            this.serverTime = new Date(data.datetime).getTime();
            this.syncOffset = this.serverTime - Date.now();
        } catch (error) {
            console.warn('Using local time fallback:', error);
            this.serverTime = Date.now();
            this.syncOffset = 0;
        }
        this.updateState();
    }

    startSyncLoop() {
        this.syncInterval = setInterval(() => {
            this.syncTime();
            this.checkSyncStatus();
        }, this.SYNC_INTERVAL_MS);
    }

    getServerTime() {
        return this.serverTime + (Date.now() - (this.serverTime - this.syncOffset));
    }

    checkSyncStatus() {
        const timeDiff = Math.abs(this.syncOffset);
        const synced = timeDiff < this.MAX_TIME_DIFF_MS;
        
        if (synced !== this.synced) {
            this.synced = synced;
            this.updateState();
        }
    }

    setupAudioEvents() {
        // Get duration when metadata loads
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalDuration = this.audio.duration;
            console.log(`Song loaded. Duration: ${this.totalDuration}s`);
        });

        this.audio.addEventListener('ended', () => {
            this.nextSong();
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.nextSong();
        });
    }

    async play() {
        if (!this.synced) {
            console.warn('Not synced yet');
            return;
        }

        // If this is a fresh start (no song playing yet), set start time to now
        if (this.songStartTime === null) {
            this.songStartTime = this.getServerTime() + this.PLAY_DELAY_MS;
            
            // Wait for the delay then load
            setTimeout(async () => {
                await this.loadAndPlayCurrentSong();
                this.isPlaying = true;
                this.notifyPlaying(true);
            }, this.PLAY_DELAY_MS);
        } else {
            // RESUME LOGIC: Calculate where we are in the song
            const currentTime = this.getServerTime();
            const elapsed = (currentTime - this.songStartTime) / 1000; // seconds
            
            // If we are past the duration, move to next song
            if (elapsed >= this.totalDuration) {
                this.nextSong();
                return;
            }

            // Seek to the calculated position
            this.audio.currentTime = elapsed;
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.notifyPlaying(true);
            }).catch(err => console.error("Play failed:", err));
        }
    }

    async loadAndPlayCurrentSong() {
        const song = this.songList[this.currentSongIndex];
        this.audio.src = song.url;
        
        try {
            // Wait for metadata to get duration
            await new Promise((resolve, reject) => {
                this.audio.oncanplay = resolve;
                this.audio.onerror = reject;
            });

            await this.audio.play();
            this.notifySongChange(song);
        } catch (error) {
            console.error('Playback failed:', error);
            this.nextSong();
        }
    }

    stop() {
        // DO NOT reset currentTime to 0!
        // Just pause the audio. The songStartTime remains the same.
        this.audio.pause();
        this.isPlaying = false;
        this.notifyPlaying(false);
    }

    nextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songList.length;
        
        // Reset start time for the new song
        this.songStartTime = this.getServerTime();
        this.totalDuration = 0; // Reset duration until loaded
        
        if (this.isPlaying) {
            this.loadAndPlayCurrentSong();
        }
    }

    onStateChange(callback) {
        this.stateListeners.push(callback);
    }

    onSongChange(callback) {
        this.songListeners.push(callback);
    }

    onPlaying(callback) {
        this.playingListeners.push(callback);
    }

    updateState() {
        this.stateListeners.forEach(cb => cb({
            synced: this.synced || false,
            serverTime: this.serverTime ? new Date(this.serverTime).toLocaleTimeString() : '--'
        }));
    }

    notifySongChange(song) {
        this.songListeners.forEach(cb => cb(song));
    }

    notifyPlaying(isPlaying) {
        this.playingListeners.forEach(cb => cb(isPlaying));
    }

    destroy() {
        clearInterval(this.syncInterval);
        this.audio.pause();
        this.audio.src = '';
    }
}
