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

export function mixedMockData(placements: string[]) {
  const recommendations: Record<string, unknown> = {}
  const content: Record<string, unknown> = {}

  placements.forEach((placement, index) => {
    if (index % 2 === 0) {
      recommendations[placement] = jsonCampaign(index + 1)
    } else {
      content[placement] = `<div>Campaign ${index + 1}</div>`
    }
  })

  return {
    ...baseResponse,
    campaigns: {
      recommendations,
      content
    }
  }
}
