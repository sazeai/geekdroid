// Mock data store
const tools = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation and text generation',
    long_description: 'ChatGPT is a powerful AI language model that can engage in natural conversations, answer questions, and help with various text-based tasks.',
    category: 'Text',
    rating: 4.8,
    image: '/logos/chat-gpt.png',
    affiliate_link: 'https://chat.openai.com',
    features: ['Natural language processing', 'Context awareness', 'Multiple language support'],
    pricing: 'Free / $20 per month',
    is_new: false,
    is_popular: true,
    status: 'approved'
  },
  {
    id: '2',
    name: 'DALL-E',
    description: 'AI image generation from text descriptions',
    long_description: 'DALL-E is an AI system that can create realistic images and art from natural language descriptions.',
    category: 'Image',
    rating: 4.7,
    image: '/logos/adobe.png',
    affiliate_link: 'https://openai.com/dall-e-2',
    features: ['Text to image generation', 'Style customization', 'High resolution output'],
    pricing: 'Credits based system',
    is_new: true,
    is_popular: true,
    status: 'approved'
  },
  {
    id: '3',
    name: 'Jasper',
    description: 'AI writing assistant for content creation',
    long_description: 'Jasper helps you create high-quality content faster with AI-powered writing assistance.',
    category: 'Text',
    rating: 4.6,
    image: '/logos/jasper.png',
    affiliate_link: 'https://jasper.ai',
    features: ['Blog post writing', 'Social media content', 'Marketing copy'],
    pricing: 'Starting at $29/month',
    is_new: false,
    is_popular: true,
    status: 'approved'
  },
  {
    id: '4',
    name: 'Midjourney',
    description: 'Create stunning artwork with AI',
    long_description: 'Midjourney is an AI art generator that creates unique and beautiful artwork from text descriptions.',
    category: 'Image',
    rating: 4.9,
    image: '/logos/monica.png',
    affiliate_link: 'https://midjourney.com',
    features: ['Art generation', 'Style mixing', 'High resolution'],
    pricing: 'Subscription based',
    is_new: true,
    is_popular: true,
    status: 'approved'
  }
]

export function getTools(category?: string, filter?: string) {
  let filteredTools = [...tools]
  
  if (category) {
    filteredTools = filteredTools.filter(tool => tool.category === category)
  }

  if (filter === 'new') {
    filteredTools = filteredTools.filter(tool => tool.is_new)
  } else if (filter === 'popular') {
    filteredTools = filteredTools.filter(tool => tool.is_popular)
  }

  return filteredTools
}

export function getTool(id: string) {
  return tools.find(tool => tool.id === id)
}

export function addTool(tool: any) {
  const newTool = {
    ...tool,
    id: String(tools.length + 1),
    rating: 0,
    is_new: true,
    is_popular: false,
    status: 'approved',
    features: tool.features.split('\n').filter(Boolean)
  }
  tools.push(newTool)
  return newTool
}

export function updateTool(id: string, updates: any) {
  const index = tools.findIndex(tool => tool.id === id)
  if (index !== -1) {
    const updatedTool = {
      ...tools[index],
      ...updates,
      features: typeof updates.features === 'string' 
        ? updates.features.split('\n').filter(Boolean)
        : updates.features
    }
    tools[index] = updatedTool
    return updatedTool
  }
  return null
}

export function deleteTool(id: string) {
  const index = tools.findIndex(tool => tool.id === id)
  if (index !== -1) {
    tools.splice(index, 1)
    return true
  }
  return false
}