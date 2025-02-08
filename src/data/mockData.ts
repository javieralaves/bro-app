import { Match } from '@/types';

export const mockConversations: Match[] = [
  {
    id: '1',
    name: 'Sarah',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    status: 'High engagement',
    lastMessage: "I'd love to try that coffee place! Their pastries look amazing 😋",
    messages: [
      {
        id: 'm1',
        content: "Hey Sarah! That photo of you at the farmers market caught my eye - are you a coffee enthusiast too? ☕",
        timestamp: '2024-03-20T10:00:00Z',
        status: 'sent'
      },
      {
        id: 'm2',
        content: "Omg yes! I'm actually a bit of a coffee snob haha. Always hunting for the best local roasters 😅",
        timestamp: '2024-03-20T10:05:00Z',
        status: 'received',
        insights: [
          "Strong enthusiasm in response + shared interest revealed - excellent connection point",
          "Self-deprecating humor ('coffee snob') shows comfort and authenticity",
          "Use of 'local' suggests values around community/authenticity - good to explore"
        ]
      },
      {
        id: 'm3',
        content: "Have you tried that new place, The Daily Grind? Their Ethiopian roast is incredible",
        timestamp: '2024-03-20T10:07:00Z',
        status: 'sent'
      },
      {
        id: 'm4',
        content: "I'd love to try that coffee place! Their pastries look amazing 😋",
        timestamp: '2024-03-20T10:10:00Z',
        status: 'received',
        insights: [
          "Quick, enthusiastic response maintaining high engagement",
          "Mentioning pastries opens another shared interest avenue",
          "Perfect opening for a casual date suggestion"
        ]
      }
    ],
    suggestions: [
      {
        id: 's1',
        content: "How about we check it out together this weekend? They do this amazing coffee tasting flight that's perfect for coffee enthusiasts 👌",
        reasoning: "Natural progression to date suggestion leveraging shared interest + offering a unique experience"
      },
      {
        id: 's2',
        content: "Their almond croissants are legendary! What's your go-to pastry? I'm always looking for recommendations from fellow foodies 😊",
        reasoning: "Building rapport through secondary interest before date suggestion + keeping conversation playful"
      }
    ]
  },
  {
    id: '2',
    name: 'Emily',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    status: 'Needs follow-up',
    lastMessage: "Yeah, I'm in tech. Working on some AI stuff.",
    messages: [
      {
        id: 'm1',
        content: "Hi Emily! Your profile mentioned you're working on something with machine learning? That caught my attention - I'm fascinated by AI's potential 🤖",
        timestamp: '2024-03-19T15:30:00Z',
        status: 'sent'
      },
      {
        id: 'm2',
        content: "Yeah, I'm in tech. Working on some AI stuff.",
        timestamp: '2024-03-19T16:45:00Z',
        status: 'received',
        insights: [
          "Delayed response + minimal elaboration suggests potential hesitation or distraction",
          "Professional topic might not be engaging enough - consider pivot to personal interests",
          "Response pattern indicates need for more emotionally engaging approach"
        ]
      }
    ],
    suggestions: [
      {
        id: 's1',
        content: "That's really cool! But I'm even more intrigued by your travel photos - that sunset shot in Bali looks incredible! What was your favorite part of the trip? ✈️",
        reasoning: "Strategic pivot to personal passion + showing attention to profile details + open-ended question to encourage sharing"
      },
      {
        id: 's2',
        content: "Outside of the tech world, what helps you unwind? I noticed you're into photography - any favorite spots in the city for capturing urban scenes? 📸",
        reasoning: "Acknowledging professional life while transitioning to leisure interests + specific observation to show genuine interest"
      }
    ]
  },
  {
    id: '3',
    name: 'Jessica',
    profilePicture: 'https://i.pravatar.cc/150?img=9',
    status: 'Missed opportunity',
    lastMessage: "Been super swamped with work lately...",
    messages: [
      {
        id: 'm1',
        content: "Jessica! Your yoga headstand in that beach photo is seriously impressive! How long have you been practicing? 🧘‍♀️",
        timestamp: '2024-03-15T12:00:00Z',
        status: 'sent'
      },
      {
        id: 'm2',
        content: "Thanks! About 5 years now. It's a great way to stay centered.",
        timestamp: '2024-03-15T14:20:00Z',
        status: 'received',
        insights: ["Positive but delayed response - might be juggling multiple conversations or busy"]
      },
      {
        id: 'm3',
        content: "That's amazing! I just started getting into meditation myself. Would love to hear your thoughts on mindfulness and maybe get some tips?",
        timestamp: '2024-03-16T10:00:00Z',
        status: 'sent'
      },
      {
        id: 'm4',
        content: "Been super swamped with work lately...",
        timestamp: '2024-03-18T09:30:00Z',
        status: 'received',
        insights: [
          "Classic soft rejection pattern - best to gracefully conclude",
          "Delayed response + work excuse indicates low priority",
          "Future reference: Earlier transition to date suggestion might have maintained momentum"
        ]
      }
    ],
    suggestions: [
      {
        id: 's1',
        content: "No worries at all! Life gets busy - if you find yourself with some free time and want to chat mindfulness over coffee, feel free to reach out. Take care! ✨",
        reasoning: "Graceful exit maintaining dignity + leaving door slightly open + showing emotional intelligence"
      }
    ]
  },
  {
    id: '4',
    name: 'Sophie',
    profilePicture: 'https://i.pravatar.cc/150?img=11',
    status: 'New match',
    lastMessage: "",
    messages: [],
    suggestions: [
      {
        id: 's1',
        content: "Sophie! Your photography portfolio is stunning - that architectural series downtown really captures the city's soul. Do you have a favorite spot for urban photography? I'd love to hear the story behind those shots 📸",
        reasoning: "Opening with specific, genuine appreciation of her art + showing cultural awareness + inviting storytelling"
      },
      {
        id: 's2',
        content: "I have to ask about that incredible ramen shot in your gallery - Ichiran? Their tonkotsu broth is life-changing! Have you explored any other hidden gem restaurants in the city? 🍜",
        reasoning: "Demonstrating shared interest + specific knowledge + opening for food adventure discussion"
      }
    ]
  },
  {
    id: '5',
    name: 'Olivia',
    profilePicture: 'https://i.pravatar.cc/150?img=16',
    status: 'High engagement',
    lastMessage: "Saturday afternoon works perfectly! Can't wait to meet Max! 🐕",
    messages: [
      {
        id: 'm1',
        content: "Your rescue pup Max is adorable! Those ears! 🐕 How long have you been involved with animal rescue?",
        timestamp: '2024-03-20T09:00:00Z',
        status: 'sent'
      },
      {
        id: 'm2',
        content: "Thank you! He's my world 💕 Been volunteering at shelters for about 3 years now. It's so rewarding! Do you have any fur babies?",
        timestamp: '2024-03-20T09:05:00Z',
        status: 'received',
        insights: [
          "Emotionally open response with personal details - excellent sign",
          "Reciprocal question shows genuine interest in connecting",
          "Shared values around animal welfare - strong foundation for connection"
        ]
      },
      {
        id: 'm3',
        content: "That's wonderful! I volunteer at City Shelter too! And yes, I have a rescue named Luna - she's always looking for playdate buddies! 🐾",
        timestamp: '2024-03-20T09:10:00Z',
        status: 'sent'
      },
      {
        id: 'm4',
        content: "Saturday afternoon works perfectly! Can't wait to meet Max! 🐕",
        timestamp: '2024-03-20T09:15:00Z',
        status: 'received',
        insights: [
          "Enthusiastic acceptance of implied date suggestion",
          "Using exclamation marks and emojis - high emotional investment",
          "Perfect momentum for confirming specific plans"
        ]
      }
    ],
    suggestions: [
      {
        id: 's1',
        content: "Amazing! There's this great dog park near the lake - lots of space for Max and Luna to play! How about we meet there around 2pm? I can send you the location 🗺️",
        reasoning: "Capitalizing on enthusiasm with specific plan + considering pets' needs + taking initiative"
      },
      {
        id: 's2',
        content: "Perfect! There's also this cute pet-friendly café nearby if you'd like to grab coffee after the dogs play! They even make special puppuccinos 🐾☕",
        reasoning: "Building on dog meetup with casual date extension + thoughtful touch with pet-friendly option"
      }
    ]
  }
]; 