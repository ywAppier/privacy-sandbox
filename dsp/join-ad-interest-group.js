const ads = new URL(location.href).searchParams.get('ads');
console.log(ads);

// dsp
const interestGroup = {
  name: ads,
  owner: new URL(import.meta.env.VITE_DSP_URL).origin,

  // x-allow-fledge: true
  biddingLogicUrl: `${import.meta.env.VITE_DSP_URL}/bidding-logic.js`,

  // x-allow-fledge: true
  //trustedBiddingSignalsUrl: `${import.meta.env.VITE_DSP_URL}/bidding_signal.json`,
  //trustedBiddingSignalsKeys: ['key1', 'key2'],

  updateUrl: `${import.meta.env.VITE_DSP_URL}/daily_update_url`, // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `${import.meta.env.VITE_ADVERTISER_URL}/${ads}-ad.html`,
      metadata: {
        type: ads,
      },
    },
  ],
};

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e);
  const kSecsPerDay = 3600;
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay));
  console.log('Current Interest Group:', interestGroup);
  console.log('Bidding Signal:', interestGroup.trustedBiddingSignalsUrl);
});
