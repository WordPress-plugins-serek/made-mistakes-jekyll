---
title: "Rip songs from Spotify"
excerpt: "Rip songs from Spotify"
tags:
  - Spotify
comments: false
comments_locked: true
published: true
last_modified_at: 2014-05-01T11:00:00
redirect_from: "/rip-songs-from-spotify-SpotifyRecorder/"
toc: false
---
When going to and from work I have a bad internet connection in the metro and therefore cannot use Spotify unless I pay for it to get offline support on my mobile. You can however rip the songs as MP3's and transfer them to your phone for offline playback. In Denmark at least this is legal to my knowledge since you can rip songs from internet radio stations as long as the radio station itself is broadcasting legally and one does not need to break any encryption, see [here](http://kum.dk/infokiosk/musik/#9) (page in Danish). To do this I did the following

1. Download and extract [Spotify Recorder](http://spotifyrecorder.codeplex.com/)
2. Check your volume mixer if you have a device for capturing sound. If you have, go to step 4
3. If you don't have a sound capturing device, download and install a virtual device described in this [post](https://spotifyrecorder.codeplex.com/discussions/448600) or directly [here](http://vbaudio.jcedeveloppement.com/Download_CABLE/VBCABLEDriver_Pack41.zip) and install the correct version (32 / 64 bit)
4. Set the sound capturing device to be the default device

{% figure caption:"Set default device" class:"gallery-2-col" %}
![](/assets/images/rip-songs-from-spotify-SpotifyRecorder.jpg)
{% endfigure %}

{:start="5"}
5. Turn down all sound except Spotify to prevent unwanted sound getting recorded

{% figure caption:"Turn down the volume or else sound from other applications might be recorded" class:"gallery-2-col" %}
![](/assets/images/rip-songs-from-spotify-SpotifyRecorder2.jpg)
{% endfigure %}

{:start="6"}
6. Launch Spotify Recorder and let it record while Spotify plays

{% figure caption:"Spotify recorder lets you record songs from Spotify" class:"gallery-2-col" %}
![](/assets/images/rip-songs-from-spotify-SpotifyRecorder3.jpg)
{% endfigure %}

There might be an easier way, but this worked for me. Just let it record all night and you should have plenty of songs. Use MP3 CoverTag or similar software to embed album / cover art to the MP3 files. The source code for Spotify Recorder is available so one might extend the code with automatic downloading and embedding of album art.
