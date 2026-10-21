window.__ModuleLoader__.load({
  id: '@local/ronova-balance-bubble',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    function cloudSvg(fill, stroke) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
  <path d="M 52 55 C 46 32 72 18 94 27 C 104 8 138 8 151 26 C 171 14 198 24 200 46 C 220 44 234 62 228 82 C 238 98 228 116 212 119 C 211 139 188 148 172 138 C 157 154 128 152 118 136 C 99 147 75 140 71 124 C 49 128 34 112 40 96 C 25 84 32 62 52 55 Z" fill="${fill}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="55" cy="150" r="10.5" fill="${fill}" stroke="${stroke}" stroke-width="3.2"/>
  <circle cx="32" cy="163" r="6.2" fill="${fill}" stroke="${stroke}" stroke-width="2.8"/>
  <circle cx="14" cy="173" r="3.4" fill="${fill}" stroke="${stroke}" stroke-width="2.4"/>
</svg>`;
    }

    const CLOUD_LIGHT = cloudSvg('#FFFDF8', '#1B0E11');
    const CLOUD_DARK = cloudSvg('#FFF8EE', '#BE8C47');
    const CLOUD_URL_LIGHT = `url("data:image/svg+xml,${encodeURIComponent(CLOUD_LIGHT)}")`;
    const CLOUD_URL_DARK = `url("data:image/svg+xml,${encodeURIComponent(CLOUD_DARK)}")`;

    const STYLES = `
.ronova-balance-anchor {
  position: relative;
  flex: none;
  align-self: stretch;
  box-sizing: border-box;
  width: 0;
  min-width: 0;
  pointer-events: none;
}
.ronova-balance-bubble {
  position: absolute;
  left: -22px;
  bottom: calc(100% + 4px);
  z-index: 30;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 210px;
  height: 168px;
  padding: 47px 36px 47px 65px;
  pointer-events: none;
  transform-origin: 16% 100%;
  animation: ronova-balance-in .28s cubic-bezier(.2, .8, .3, 1.15) both;
}
.ronova-balance-cloud {
  position: absolute;
  inset: 0;
  background-image: ${CLOUD_URL_LIGHT};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: drop-shadow(0 10px 16px rgba(10, 4, 6, .32));
}
body[data-ds-dark-theme] .ronova-balance-cloud {
  background-image: ${CLOUD_URL_DARK};
  filter: drop-shadow(0 14px 24px rgba(0, 0, 0, .62)) drop-shadow(0 0 14px rgba(190, 140, 71, .20));
}
.ronova-balance-text {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  color: #1B0E11;
  font-family: var(--dsh-font-family-text, "Avenir Next", "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif);
  font-size: 12px;
  font-weight: 500;
  line-height: 14.5px;
  letter-spacing: .01em;
  text-align: left;
  transform: translate(-6px, -9px);
}
.ronova-balance-line {
  display: block;
}
.ronova-balance-amount {
  color: #8A1220;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ronova-balance-nudge {
  display: block;
  margin-top: 2px;
  color: #8A1220;
  font-weight: 700;
  white-space: nowrap;
}
.ronova-balance-nudge.is-ok {
  color: #455E4C;
}
@keyframes ronova-balance-in {
  0% { opacity: 0; transform: translateY(6px) scale(.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ronova-balance-bubble { animation: none; }
}
`;

    const DEFAULT_THRESHOLD = 10;
    const SETTINGS_NAMESPACE = 'ronova-balance-bubble';
    const SETTINGS_LOCALE = 'ronova-balance-bubble';
    const THRESHOLD_TEXT = {
      zh: {
        'row.title': '低余额提醒阈值',
        'row.description': '余额低于该值时显示“记得及时充值~”，否则显示“余额充足，放心蹬~”。',
        'row.unit': '元',
        'row.saveFailed': '保存失败，请重试。'
      },
      en: {
        'row.title': 'Low balance reminder threshold',
        'row.description': 'Controls the low-balance reminder in the Ronova balance bubble.',
        'row.unit': 'CNY',
        'row.saveFailed': 'Could not save. Please try again.'
      }
    };
    const THRESHOLD_STYLES = `
.ronova-threshold-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 0;
  border-bottom: .5px solid var(--dsw-alias-border-l2);
}
.ronova-threshold-copy { min-width: 0; }
.ronova-threshold-title {
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 20px;
}
.ronova-threshold-description {
  margin-top: 4px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.ronova-threshold-error {
  margin-top: 4px;
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
}
.ronova-threshold-control {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
}
.ronova-threshold-input {
  box-sizing: border-box;
  width: 72px;
  height: 32px;
  padding: 0 8px;
  border: .5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 14px;
  text-align: right;
}
.ronova-threshold-input:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 1px;
}
.ronova-threshold-input:disabled { opacity: .55; }
.ronova-threshold-unit {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
`;

    const numberFormat = new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    let bubbleState = { status: 'hidden' };
    let currentThreshold = DEFAULT_THRESHOLD;
    const bubbleListeners = new Set();

    function setBubbleState(next) {
      bubbleState = next;
      for (const listener of bubbleListeners) {
        try {
          listener(next);
        } catch (error) {
          // A decorative listener must never break the account reader.
        }
      }
    }

    function setThreshold(next) {
      if (!Number.isFinite(next)) return;
      const normalized = Math.max(0, Math.min(10000, Math.trunc(next)));
      if (normalized === currentThreshold) return;
      currentThreshold = normalized;
      if (bubbleState.status === 'ready') {
        setBubbleState({
          ...bubbleState,
          low: bubbleState.recharge + bubbleState.bonus < currentThreshold
        });
      }
    }

    function useBubbleState() {
      const [state, setState] = React.useState(bubbleState);
      React.useEffect(() => {
        const listener = (next) => setState(next);
        bubbleListeners.add(listener);
        setState(bubbleState);
        return () => {
          bubbleListeners.delete(listener);
        };
      }, []);
      return state;
    }

    function walletTotal(wallets, currency) {
      let total = 0;
      for (const wallet of wallets) {
        if (!wallet || wallet.currency !== currency) continue;
        const value = Number(wallet.balance);
        if (Number.isFinite(value)) total += value;
      }
      return total;
    }

    /** Fold the account balance projection into the bubble model. */
    function computeBalance(balance) {
      const rechargeWallets = Array.isArray(balance.value) ? balance.value : [];
      const bonusWallets = Array.isArray(balance.bonusWallets) ? balance.bonusWallets : [];
      const all = rechargeWallets.concat(bonusWallets);
      const preferred = all.find((wallet) => wallet && wallet.currency === 'CNY')
        || all.find((wallet) => wallet && wallet.currency === 'USD')
        || all[0];
      const currency = preferred && (preferred.currency === 'CNY' || preferred.currency === 'USD')
        ? preferred.currency
        : 'CNY';
      const recharge = walletTotal(rechargeWallets, currency);
      const bonus = walletTotal(bonusWallets, currency);
      return {
        status: 'ready',
        currency,
        recharge,
        bonus,
        low: recharge + bonus < currentThreshold
      };
    }

    function formatAmount(amount, currency) {
      const symbol = currency === 'USD' ? '$' : currency === 'CNY' ? '¥' : '';
      const sign = amount < 0 ? '-' : '';
      const abs = Math.abs(amount);
      if (abs > 0 && abs < 0.01) return `${sign}<${symbol}0.01`;
      // Platform Web truncates positive balances to cents instead of rounding up.
      const truncated = Math.floor(abs * 100) / 100;
      return `${sign}${symbol}${numberFormat.format(truncated)}`;
    }

    function accountMetadata(ctx) {
      const boot = globalThis.__DSH_BOOT__;
      const version = boot && boot.release && boot.release.version
        ? String(boot.release.version)
        : '0.0.0';
      let locale = 'en';
      try {
        const snapshot = ctx.locale.getSnapshot();
        if (snapshot && typeof snapshot.active === 'string') locale = snapshot.active;
      } catch (error) {
        // Keep the neutral locale when the service is still settling.
      }
      return {
        version,
        locale,
        timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60
      };
    }

    function BalanceAnchor(props) {
      const wide = !props || props.wide !== false;
      const state = useBubbleState();
      const anchorRef = React.useRef(null);
      const [room, setRoom] = React.useState(false);

      React.useEffect(() => {
        if (!wide) {
          setRoom(false);
          return undefined;
        }
        const anchor = anchorRef.current;
        if (!anchor) return undefined;
        let parent = anchor.parentElement;
        while (parent && parent !== document.body && parent.getBoundingClientRect().width < 120) {
          parent = parent.parentElement;
        }
        if (!parent) return undefined;
        const measure = () => {
          setRoom(parent.getBoundingClientRect().width >= 228);
        };
        measure();
        if (typeof ResizeObserver === 'function') {
          const observer = new ResizeObserver(measure);
          observer.observe(parent);
          return () => observer.disconnect();
        }
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
      }, [wide]);

      const visible = wide && room && state.status === 'ready';

      return h(React.Fragment, null,
        h('style', {
          'data-ronova-balance': 'style',
          dangerouslySetInnerHTML: { __html: STYLES }
        }),
        h('span', { ref: anchorRef, className: 'ronova-balance-anchor' },
          visible ? h('span', { className: 'ronova-balance-bubble', role: 'status' },
            h('span', { className: 'ronova-balance-cloud', 'aria-hidden': true }),
            h('span', { className: 'ronova-balance-text' },
              h('span', { className: 'ronova-balance-line' }, '喂，你还有'),
              h('span', { className: 'ronova-balance-line' },
                h('strong', { className: 'ronova-balance-amount' }, formatAmount(state.recharge, state.currency)),
                ' 充值余额，'
              ),
              h('span', { className: 'ronova-balance-line' },
                h('strong', { className: 'ronova-balance-amount' }, formatAmount(state.bonus, state.currency)),
                ' 赠金余额。'
              ),
              h('span', {
                className: 'ronova-balance-nudge' + (state.low ? '' : ' is-ok')
              }, state.low ? '记得及时充值~' : '余额充足，放心蹬~')
            )
          ) : null
        )
      );
    }

    function useConfigForm(form) {
      const [snapshot, setSnapshot] = React.useState(() => form.getSnapshot());
      React.useEffect(() => {
        setSnapshot(form.getSnapshot());
        const off = form.subscribe(() => setSnapshot(form.getSnapshot()));
        return off;
      }, [form]);
      return snapshot;
    }

    function ThresholdRow({ t, form, save }) {
      const snapshot = useConfigForm(form);
      const stored = snapshot && snapshot.value && Number.isFinite(snapshot.value.threshold)
        ? snapshot.value.threshold
        : DEFAULT_THRESHOLD;
      const [draft, setDraft] = React.useState(String(stored));
      const [busy, setBusy] = React.useState(false);
      const [failed, setFailed] = React.useState(false);
      const [error, setError] = React.useState('');

      React.useEffect(() => {
        setDraft(String(stored));
      }, [stored]);

      const commit = () => {
        if (busy) return;
        const parsed = Number(draft);
        if (!Number.isFinite(parsed)) {
          setDraft(String(stored));
          return;
        }
        const next = Math.max(0, Math.min(10000, Math.trunc(parsed)));
        if (next === stored) {
          setDraft(String(stored));
          return;
        }
        setBusy(true);
        setFailed(false);
        setError('');
        save(next)
          .then(() => setDraft(String(next)))
          .catch((reason) => {
            setFailed(true);
            setError(reason && reason.message ? reason.message : '');
            setDraft(String(stored));
          })
          .finally(() => setBusy(false));
      };

      return h(React.Fragment, null,
        h('style', {
          'data-ronova-threshold': 'style',
          dangerouslySetInnerHTML: { __html: THRESHOLD_STYLES }
        }),
        h('div', { className: 'ronova-threshold-row' },
          h('div', { className: 'ronova-threshold-copy' },
            h('div', { className: 'ronova-threshold-title' }, t('row.title')),
            h('div', { className: 'ronova-threshold-description' }, t('row.description')),
            failed ? h('div', { className: 'ronova-threshold-error', role: 'alert' },
              error ? `${t('row.saveFailed')} (${error})` : t('row.saveFailed')
            ) : null
          ),
          h('label', { className: 'ronova-threshold-control' },
            h('input', {
              className: 'ronova-threshold-input',
              type: 'number',
              min: 0,
              max: 10000,
              step: 1,
              value: draft,
              disabled: busy || (snapshot && snapshot.writable === false),
              'aria-label': t('row.title'),
              onChange: (event) => setDraft(event.target.value),
              onBlur: commit,
              onKeyDown: (event) => {
                if (event.key === 'Enter') event.currentTarget.blur();
              }
            }),
            h('span', { className: 'ronova-threshold-unit' }, t('row.unit'))
          )
        )
      );
    }

    function installThresholdSettings(ctx) {
      ctx.effect(() => ctx.locale.register(SETTINGS_LOCALE, THRESHOLD_TEXT), 'ronova balance bubble: threshold copy');
      ctx.inject(['slots', 'configForms', 'remote', 'remote.settings'], (settingsCtx) => {
        const form = settingsCtx.configForms.get(SETTINGS_NAMESPACE);
        const sync = () => {
          const snapshot = form.getSnapshot();
          const value = snapshot && snapshot.value && snapshot.value.threshold;
          if (Number.isFinite(value)) setThreshold(value);
        };
        settingsCtx.effect(() => {
          const off = form.subscribe(sync);
          sync();
          return () => off();
        }, 'ronova balance bubble: threshold sync');
        settingsCtx.slots.inject('settings.general.item', () => settingsCtx.slots.register({
          name: 'settings.general.item',
          id: 'ronova-balance-threshold',
          order: 30,
          locale: SETTINGS_LOCALE,
          inject: () => ({
            form,
            save: async (next) => {
              const response = await settingsCtx.remote.settings.mutate(
                SETTINGS_NAMESPACE,
                [{ op: 'set', path: ['threshold'], value: next }],
                void 0
              );
              if (!response.ok) throw new Error(response.error?.message || 'settings write failed');
              setThreshold(next);
            }
          })
        }, ThresholdRow));
      });
    }

    function installBalanceReader(ctx) {
      ctx.inject(['remote', 'remote.account'], (accountCtx) => {
        accountCtx.effect(() => {
          let disposed = false;
          let refreshing = false;
          let stream = null;

          const refresh = async () => {
            if (disposed || refreshing) return;
            refreshing = true;
            try {
              const result = await accountCtx.remote.account.getBalance(accountMetadata(ctx));
              if (disposed || !result || !result.ok) return;
              const value = result.value;
              if (value === null || value === undefined) {
                setBubbleState({ status: 'hidden' });
                return;
              }
              if (value.status !== 'ready') return;
              setBubbleState(computeBalance(value));
            } catch (error) {
              // Keep the last good balance; focus and the next account frame retry.
            } finally {
              refreshing = false;
            }
          };

          const refreshSoon = () => {
            void refresh();
          };

          const timer = window.setInterval(refreshSoon, 5 * 60 * 1000);
          const onFocus = () => refreshSoon();
          const onVisibility = () => {
            if (document.visibilityState === 'visible') refreshSoon();
          };
          window.addEventListener('focus', onFocus);
          document.addEventListener('visibilitychange', onVisibility);
          refreshSoon();

          try {
            stream = accountCtx.remote.$stream({
              name: 'account',
              open: (signal) => accountCtx.remote.account.watch(signal),
              ended: () => new Error('account stream ended')
            });
          } catch (error) {
            stream = null;
          }

          if (stream !== null) {
            void (async () => {
              try {
                for await (const frame of stream) {
                  if (disposed) break;
                  try {
                    frame.accept?.();
                  } catch (error) {
                    // Acceptance is advisory for this read-only bubble.
                  }
                  const value = frame && frame.value;
                  if (!value) continue;
                  if (value.status === 'credential-stored') refreshSoon();
                  else if (value.status === 'signed-out') setBubbleState({ status: 'hidden' });
                }
              } catch (error) {
                // The remote supervisor reconnects; focus and the interval retry.
              }
            })();
          }

          return () => {
            disposed = true;
            window.clearInterval(timer);
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVisibility);
            try {
              stream?.dispose();
            } catch (error) {
              // Already disposed by the remote supervisor.
            }
            stream = null;
            setBubbleState({ status: 'hidden' });
          };
        }, 'ronova balance bubble: account');
      });
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'ronova.balance',
          order: -19,
          label: 'Ronova balance'
        }, BalanceAnchor));
        installBalanceReader(ctx);
        installThresholdSettings(ctx);
      }
    };
  }
});
