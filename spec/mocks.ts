const baseResponse = {
  campaigns: {
    recommendations: {},
    content: {}
  },
  recommendations: {}
}

function jsonCampaign(num: number) {
  return {
    title: `Campaign ${num}`,
    products: [{ name: `Product ${num}-1` }, { name: `Product ${num}-2` }]
  }
}

export function jsonMockDataForPage(pageType: string) {
  return {
    ...baseResponse,
    campaigns: {
      recommendations: {
        [`${pageType}page-nosto-1`]: jsonCampaign(1),
        [`${pageType}page-nosto-2`]: jsonCampaign(2)
      },
      content: {}
    }
  }
}

export function htmlMockDataForPage(pageType: string) {
  return {
    ...baseResponse,
    recommendations: {
      [`${pageType}page-nosto-1`]: "<div>Campaign 1</div>",
      [`${pageType}page-nosto-2`]: "<div>Campaign 2</div>"
    }
  }
}
