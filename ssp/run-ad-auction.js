// ssp
const auctionConfig = {
  seller: new URL(import.meta.env.VITE_SSP_URL).origin, // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: `${import.meta.env.VITE_SSP_URL}/decision-logic.js`,

  interestGroupBuyers: [
    // * is not supported yet
    import.meta.env.VITE_DSP_URL,
  ],
  // public for everyone
  auctionSignals: { auction_signals: 'auction_signals' },

  // only for single party
  sellerSignals: { seller_signals: 'seller_signals' },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    import.meta.env.VITE_DSP_URL: {
      per_buyer_signals: 'per_buyer_signals',
    },
  },
};

document.addEventListener('DOMContentLoaded', async (e) => {
  const query = new URL(location.href).search;
  const frametype = query === '?fencedframe' ? 'fencedframe' : 'iframe';
  console.log(`display ads in <${frametype}>`);

  // https://developer.chrome.com/docs/privacy-sandbox/fenced-frame/

  if (frametype === 'fencedframe') {
    const frameConfig = await navigator.runAdAuction({
      ...auctionConfig,
      resolveToConfig: true
    });
    const $iframe = document.createElement(frametype);
    $iframe.config = frameConfig;
    document.body.appendChild($iframe);
  } else {
    const adAuctionResult = await navigator.runAdAuction(auctionConfig);
    console.log({ adAuctionResult });
    const $iframe = document.createElement(frametype);
    document.body.appendChild($iframe);
  }

});
