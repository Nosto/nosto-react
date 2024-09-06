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

export function jsonMockData(placements: string[]) {
  const recommendations = Object.fromEntries(placements.map((placement, index) => [placement, jsonCampaign(index + 1)]))
  return {
    ...baseResponse,
    campaigns: {
      recommendations,
      content: {}
    }
  }
}

export function htmlMockDataForPage(placements: string[]) {
  const recommendations = Object.fromEntries(
    placements.map((placement, index) => [placement, `<div>Campaign ${index + 1}</div>`])
  )
  return {
    ...baseResponse,
    recommendations
  }
}
