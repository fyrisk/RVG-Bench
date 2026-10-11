(() => {
  const tablist = document.querySelector('.case-tabs');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.case-panel'));
  const players = panels.map(panel => {
    const video = panel.querySelector('video');
    const status = panel.querySelector('.case-playback-status');
    const start = Number(panel.dataset.start);
    const end = Number(panel.dataset.end);
    let stopAt = null;
    let pendingStart = null;

    function pause() {
      stopAt = null;
      pendingStart = null;
      if (!video.paused) video.pause();
    }

    video.addEventListener('loadedmetadata', () => {
      if (pendingStart !== null) {
        video.currentTime = pendingStart;
        pendingStart = null;
      }
    });

    video.addEventListener('timeupdate', () => {
      if (stopAt !== null && video.currentTime >= stopAt) {
        const boundary = stopAt;
        pause();
        video.currentTime = boundary;
      }
    });
    panel.querySelectorAll('[data-play]').forEach(button => {
      button.addEventListener('click', async () => {
        players.forEach(player => player.pause());
        status.textContent = '';
        const target = button.dataset.play === 'target';
        stopAt = target ? end : null;
        const initialTime = target ? start : 0;
        if (video.readyState >= 1) {
          video.currentTime = initialTime;
        } else {
          // Seek once the timeline is available; play() initiates loading from this click.
          pendingStart = initialTime;
        }
        try {
          await video.play();
        } catch (error) {
          if (error.name !== 'AbortError') {
            status.textContent = 'Playback could not start. Please try the video player controls.';
          }
        }
      });
    });
    panel.querySelector('.case-actions').hidden = false;
    return { pause };
  });

  function select(index, focus = false) {
    players.forEach(player => player.pause());
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const next = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      }[event.key];
      if (next !== undefined) {
        event.preventDefault();
        select(next, true);
      }
    });
  });
  select(0);
  tablist.hidden = false;
})();
