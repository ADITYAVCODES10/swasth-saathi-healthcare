// Chatbot API utilities
// Handles communication with the chatbot backend service

const CHATBOT_API_URL = process.env.REACT_APP_BACKEND_URL + '/api/chatbot';

// Main chatbot request function
export const sendChatMessage = async (message, language = 'en', sessionId = null) => {
  try {
    const response = await fetch(CHATBOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: message,
        language: language,
        session_id: sessionId || generateSessionId(),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      answer: data.answer,
      sessionId: data.session_id,
      confidence: data.confidence || 0.8,
      suggestions: data.suggestions || [],
    };
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return {
      success: false,
      error: error.message,
      answer: getErrorResponse(language),
    };
  }
};

// Generate unique session ID
const generateSessionId = () => {
  return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Get appropriate error response based on language
const getErrorResponse = (language) => {
  const errorResponses = {
    en: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team.",
    hi: "क्षमा करें, अभी मुझे कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें या हमारी सहायता टीम से संपर्क करें।",
    ml: "ക്ഷമിക്കണം, എനിക്ക് ഇപ്പോൾ കണക്റ്റ് ചെയ്യാൻ പ്രശ്നമുണ്ട്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ ഞങ്ങളുടെ സപ്പോർട്ട് ടീമുമായി ബന്ധപ്പെടുക।"
  };
  return errorResponses[language] || errorResponses.en;
};

// Predefined FAQ responses for common questions
export const getFAQResponse = (question, language = 'en') => {
  const faqData = {
    en: {
      'how do i register': {
        answer: "To register, click on the 'Register' button in the navigation menu, select your role (Migrant Worker, Doctor, or Admin), and fill out the required information. You'll need to provide basic personal details and relevant documents for verification.",
        suggestions: ["What documents do I need?", "How long does verification take?", "Can I register on mobile?"]
      },
      'what services are available': {
        answer: "Swasth Saathi offers comprehensive healthcare services including: Digital health records, Medical consultations, Appointment booking, Emergency services, Health card generation, and Multilingual support. Services are tailored for migrant workers, healthcare providers, and administrators.",
        suggestions: ["How to book appointment?", "Emergency contact information", "Health card benefits"]
      },
      'emergency contact information': {
        answer: "For medical emergencies, call 108 (National Ambulance Service) or visit the nearest government hospital. For Swasth Saathi support emergencies, call +91-11-2XXX-XXXX (24/7 helpline). Always prioritize immediate medical attention in case of serious health issues.",
        suggestions: ["Nearest hospital locator", "Emergency preparation tips", "When to call emergency services"]
      },
      'what documents do i need': {
        answer: "Required documents vary by role: Migrant Workers need Aadhaar card, phone number, emergency contact, and medical certificates (if any). Doctors need medical registration certificate, degree certificates, and clinic/hospital details. All users need valid email and phone number.",
        suggestions: ["Document upload process", "Document verification time", "What if documents are in regional language?"]
      }
    },
    hi: {
      'मैं पंजीकरण कैसे करूं': {
        answer: "पंजीकरण के लिए, नेवीगेशन मेनू में 'पंजीकरण' बटन पर क्लिक करें, अपनी भूमिका (प्रवासी श्रमिक, डॉक्टर, या प्रशासक) चुनें, और आवश्यक जानकारी भरें। आपको सत्यापन के लिए बुनियादी व्यक्तिगत विवरण और संबंधित दस्तावेज प्रदान करने होंगे।",
        suggestions: ["मुझे कौन से दस्तावेज चाहिए?", "सत्यापन में कितना समय लगता है?", "क्या मैं मोबाइल पर पंजीकरण कर सकता हूं?"]
      },
      'कौन सी सेवाएं उपलब्ध हैं': {
        answer: "स्वास्थ्य साथी व्यापक स्वास्थ्य सेवाएं प्रदान करता है जिसमें शामिल हैं: डिजिटल स्वास्थ्य रिकॉर्ड, चिकित्सा परामर्श, नियुक्ति बुकिंग, आपातकालीन सेवाएं, स्वास्थ्य कार्ड जेनेरेशन, और बहुभाषी समर्थन। सेवाएं प्रवासी श्रमिकों, स्वास्थ्य सेवा प्रदाताओं और प्रशासकों के लिए तैयार की गई हैं।",
        suggestions: ["नियुक्ति कैसे बुक करें?", "आपातकालीन संपर्क जानकारी", "स्वास्थ्य कार्ड के फायदे"]
      }
    },
    ml: {
      'ഞാൻ എങ്ങനെ രജിസ്റ്റർ ചെയ്യും': {
        answer: "രജിസ്റ്റർ ചെയ്യാൻ, നാവിഗേഷൻ മെനുവിലെ 'രജിസ്റ്റർ' ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക, നിങ്ങളുടെ റോൾ (കുടിയേറ്റ തൊഴിലാളി, ഡോക്ടർ, അല്ലെങ്കിൽ അഡ്മിൻ) തിരഞ്ഞെടുക്കുക, കൂടാതെ ആവശ്യമായ വിവരങ്ങൾ പൂരിപ്പിക്കുക. സാക്ഷ്യപത്രത്തിനായി നിങ്ങൾ അടിസ്ഥാന വ്യക്തിഗത വിശദാംശങ്ങളും പ്രസക്തമായ രേഖകളും നൽകേണ്ടതുണ്ട്.",
        suggestions: ["എനിക്ക് എന്ത് ഡോക്യുമെന്റുകൾ വേണം?", "സാക്ഷ്യപത്രത്തിന് എത്ര സമയമെടുക്കും?", "മൊബൈലിൽ രജിസ്റ്റർ ചെയ്യാൻ കഴിയുമോ?"]
      },
      'എന്ത് സേവനങ്ങളാണ് ലഭ്യമായത്': {
        answer: "സ്വാസ്ഥ്യ സാഥി സമഗ്രമായ ആരോഗ്യസേവനങ്ങൾ നൽകുന്നു: ഡിജിറ്റൽ ആരോഗ്യ റെക്കോർഡുകൾ, മെഡിക്കൽ കൺസൾട്ടേഷനുകൾ, അപ്പോയിന്റ്മെന്റ് ബുക്കിംഗ്, അടിയന്തര സേവനങ്ങൾ, ആരോഗ്യ കാർഡ് ജനറേഷൻ, കൂടാതെ ബഹുഭാഷാ പിന്തുണ. സേവനങ്ങൾ കുടിയേറ്റ തൊഴിലാളികൾ, ആരോഗ്യ സേവന ദാതാക്കൾ, ഭരണാധികാരികൾ എന്നിവർക്കായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു.",
        suggestions: ["അപ്പോയിന്റ്മെന്റ് എങ്ങനെ ബുക്ക് ചെയ്യാം?", "അടിയന്തര കോൺടാക്റ്റ് വിവരങ്ങൾ", "ആരോഗ്യ കാർഡിന്റെ ഗുണങ്ങൾ"]
      }
    }
  };

  const langData = faqData[language] || faqData.en;
  const normalizedQuestion = question.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(langData)) {
    if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
      return {
        success: true,
        answer: response.answer,
        suggestions: response.suggestions,
        isPreDefined: true
      };
    }
  }

  return null;
};

// Get quick questions based on language
export const getQuickQuestions = (language = 'en') => {
  const quickQuestions = {
    en: [
      "How do I register?",
      "What services are available?",
      "Emergency contact information",
      "What documents do I need?"
    ],
    hi: [
      "मैं पंजीकरण कैसे करूं?",
      "कौन सी सेवाएं उपलब्ध हैं?",
      "आपातकालीन संपर्क जानकारी",
      "मुझे कौन से दस्तावेज चाहिए?"
    ],
    ml: [
      "ഞാൻ എങ്ങനെ രജിസ്റ്റർ ചെയ്യും?",
      "എന്ത് സേവനങ്ങളാണ് ലഭ്യമായത്?",
      "അടിയന്തര കോൺടാക്റ്റ് വിവരങ്ങൾ",
      "എനിക്ക് എന്ത് ഡോക്യുമെന്റുകൾ വേണം?"
    ]
  };

  return quickQuestions[language] || quickQuestions.en;
};

// Mock chatbot response for development
export const getMockChatResponse = async (message, language) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Check for predefined FAQ first
  const faqResponse = getFAQResponse(message, language);
  if (faqResponse) {
    return faqResponse;
  }

  // Default responses for unmatched queries
  const defaultResponses = {
    en: [
      "Thank you for your question. Our healthcare support team will get back to you shortly with detailed information.",
      "I understand you need help with that. Let me connect you with a specialist who can provide accurate guidance.",
      "That's a great question! For specific medical or administrative queries, I recommend speaking with our certified support staff.",
      "I'm here to help! For complex issues, our dedicated support team is available 24/7 to assist you."
    ],
    hi: [
      "आपके प्रश्न के लिए धन्यवाद। हमारी स्वास्थ्य सहायता टीम जल्द ही विस्तृत जानकारी के साथ आपसे संपर्क करेगी।",
      "मैं समझता हूं कि आपको इसमें मदद की जरूरत है। मैं आपको एक विशेषज्ञ से जोड़ता हूं जो सटीक मार्गदर्शन प्रदान कर सकता है।",
      "यह एक बेहतरीन सवाल है! विशिष्ट चिकित्सा या प्रशासनिक प्रश्नों के लिए, मैं हमारे प्रमाणित सहायता स्टाफ से बात करने की सलाह देता हूं।"
    ],
    ml: [
      "നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി. ഞങ്ങളുടെ ആരോഗ്യ സപ്പോർട്ട് ടീം വിശദമായ വിവരങ്ങളുമായി ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.",
      "അതിൽ നിങ്ങൾക്ക് സഹായം ആവശ്യമാണെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു. കൃത്യമായ മാർഗനിർദേശം നൽകാൻ കഴിയുന്ന ഒരു സ്പെഷ്യലിസ്റ്റുമായി ഞാൻ നിങ്ങളെ ബന്ധിപ്പിക്കട്ടെ.",
      "അതൊരു മികച്ച ചോദ്യമാണ്! നിർദ്ദിഷ്ട മെഡിക്കൽ അല്ലെങ്കിൽ അഡ്മിനിസ്ട്രേറ്റീവ് ചോദ്യങ്ങൾക്ക്, ഞങ്ങളുടെ സർട്ടിഫൈഡ് സപ്പോർട്ട് സ്റ്റാഫുമായി സംസാരിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു."
    ]
  };

  const responses = defaultResponses[language] || defaultResponses.en;
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return {
    success: true,
    answer: randomResponse,
    suggestions: getQuickQuestions(language).slice(0, 3),
    confidence: 0.6
  };
};