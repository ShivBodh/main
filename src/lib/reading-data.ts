
export interface Verse {
  number: number;
  sanskrit: string[];
  hindi: string;
  english: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pdfUrl: string; // This can be used for a "Download PDF" feature later
  imageUrl: string;
  aiHint: string;
  content?: Verse[];
}

export const readingList: Book[] = [
  {
    id: 'bhaja-govindam',
    title: 'Bhaja Govindam',
    author: 'Adi Shankaracharya',
    description: 'A powerful hymn that emphasizes the importance of devotion and seeking Govinda (God) as the ultimate goal, cutting through worldly attachments.',
    pdfUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1690035342730-82695869389a?q=80&w=400&h=600&fit=crop',
    aiHint: 'vedanta art',
    content: [
      {
        number: 1,
        sanskrit: ['भजगोविन्दं भजगोविन्दं, गोविन्दं भजमूढमते ।', 'सम्प्राप्ते सन्निहिते काले, नहि नहि रक्षति डुकृञ्करणे ॥'],
        hindi: 'हे मूढ़बुद्धि! गोविन्द का भजन कर, गोविन्द का भजन कर, गोविन्द का ही भजन कर। जब मृत्यु का समय निकट आ जायेगा, तो व्याकरण के नियम तुम्हारी रक्षा नहीं कर सकेंगे॥',
        english: 'Worship Govinda, Worship Govinda, Worship Govinda, O deluded mind! When the appointed time (death) arrives, the rules of grammar will not save you.'
      },
      {
        number: 2,
        sanskrit: ['मूढ जहीहि धनागमतृष्णां, कुरु सद्बुद्धिं मनसि वितृष्णाम् ।', 'यल्लभसे निजकर्मोपात्तं, वित्तं तेन विनोदय चित्तम् ॥'],
        hindi: 'हे मूढ़! धन-प्राप्ति की तृष्णा को त्याग दे, अपने मन में सद्बुद्धि और तृष्णाहीनता का विकास कर। अपने कर्मों से जो भी धन प्राप्त हो, उसी से अपने चित्त को प्रसन्न रख।',
        english: 'O deluded one, give up your thirst for accumulating wealth. Develop good sense and contentment in your mind. With whatever wealth you acquire through your own karma, be content.'
      },
      {
        number: 3,
        sanskrit: ['नारीस्तनभरनाभीदेशं, दृष्ट्वा मा गा मोहावेशम् ।', 'एतन्मांसवसादिविकारं, मनसि विचिन्तय वारं वारम् ॥'],
        hindi: 'नारी के शरीर के अंगों को देखकर मोह में मत पड़ो। अपने मन में बार-बार विचार करो कि यह सब मांस, वसा आदि का ही विकार है।',
        english: 'Do not get lost in infatuation by looking at the physical beauty of a woman. Repeatedly remind your mind that this is but a modification of flesh and fat.'
      },
      {
        number: 4,
        sanskrit: ['नलिनीदलगतजलमतितरलं, तद्वज्जीवितमतिशयचपलम् ।', 'विद्धि व्याध्यभिमानग्रस्तं, लोकं शोकह्तं च समस्तम् ॥'],
        hindi: 'कमल के पत्ते पर पड़ी पानी की बूँद की तरह जीवन अत्यंत चंचल है। समझ लो कि यह सारा संसार रोग और अहंकार से ग्रस्त है, और शोक में डूबा हुआ है।',
        english: 'Life is as uncertain as a water drop on a lotus leaf. Know that the entire world is afflicted with disease and conceit, and is drowning in sorrow.'
      },
      {
        number: 5,
        sanskrit: ['यावद्वित्तोपार्जनसक्तः, तावन्निजपरिवारो रक्तः ।', 'पश्चाज्जीवति जर्जरदेहे, वार्तां कोऽपि न पृच्छति गेहे ॥'],
        hindi: 'जब तक व्यक्ति धन कमाने में समर्थ है, तब तक ही उसका परिवार उसके प्रति प्रेम दिखता है। बाद में, जब शरीर जर्जर हो जाता है, तो घर में कोई भी उससे बात तक नहीं करता।',
        english: 'As long as a man is fit and able to earn money, so long is his family attached to him. After that, when his body becomes infirm, no one at home cares to even speak to him.'
      },
      {
        number: 6,
        sanskrit: ['यावत्पवनो निवसति देहे, तावत्पृच्छति कुशलं गेहे ।', 'गतवति वायौ देहापाये, भार्या बिभ्यति तस्मिन्काये ॥'],
        hindi: 'जब तक शरीर में प्राण रहते हैं, तब तक ही घर में लोग कुशलता पूछते हैं। प्राणवायु के निकलते ही, शरीर के नष्ट होने पर, पत्नी भी उस शरीर से डरती है।',
        english: 'As long as there is breath in the body, people at home inquire about one\'s welfare. Once the breath departs and the body decays, even one\'s own wife fears it.'
      },
      {
        number: 7,
        sanskrit: ['बालस्तावत्क्रीडासक्तः, तरुणस्तावत्तरुणीसक्तः ।', 'वृद्धस्तावच्चिन्तासक्तः, परे ब्रह्मणि कोऽपि न सक्तः ॥'],
        hindi: 'बचपन में व्यक्ति खेल में लगा रहता है, युवावस्था में युवती में, और वृद्धावस्था में चिंताओं में डूबा रहता है। परब्रह्म में तो कोई भी नहीं लगता।',
        english: 'A boy is attached to play, a youth is attached to a young woman, and an old man is attached to worry. But no one is attached to the Supreme Brahman.'
      },
      {
        number: 8,
        sanskrit: ['का ते कान्ता कस्ते पुत्रः, संसारोऽयमतीव विचित्रः ।', 'कस्य त्वं कः कुत आयातः, तत्त्वं चिन्तय तदिह भ्रातः ॥'],
        hindi: 'कौन तुम्हारी पत्नी है, कौन तुम्हारा पुत्र है? यह संसार अत्यंत विचित्र है। तुम किसके हो, कौन हो, कहाँ से आये हो? हे भाई, इस तत्त्व का तो विचार करो।',
        english: 'Who is your wife? Who is your son? This world is exceedingly strange. Of whom do you belong? Who are you? From where have you come? O brother, ponder on that truth.'
      },
      {
        number: 9,
        sanskrit: ['सत्सङ्गत्वे निस्सङ्गत्वं, निस्सङ्गत्वे निर्मोहत्वम् ।', 'निर्मोहत्वे निश्चलतत्त्वं, निश्चलतत्त्वे जीवन्मुक्तिः ॥'],
        hindi: 'सत्संग से निःसंगता (अनासक्ति) आती है, निःसंगता से निर्मोहता आती है। निर्मोहता से स्थिर तत्त्व (ज्ञान) प्राप्त होता है, और स्थिर तत्त्व से जीवनमुक्ति मिलती है।',
        english: 'From good company comes non-attachment, from non-attachment comes freedom from delusion. From freedom from delusion comes steadfastness of mind, and from steadfastness of mind comes liberation in life.'
      },
      {
        number: 10,
        sanskrit: ['वयसि गते कः कामविकारः, शुष्के नीरे कः कासारः ।', 'क्षीणे वित्te कः परिवारः, ज्ञाते तत्त्वे कः संसारः ॥'],
        hindi: 'आयु बीत जाने पर काम-विकार कहाँ रहता है? पानी सूख जाने पर तालाब कहाँ रहता है? धन चले जाने पर परिवार कहाँ रहता है? और तत्त्व का ज्ञान हो जाने पर संसार कहाँ रहता है?',
        english: 'When youth is gone, where is lust? When water dries up, where is the lake? When wealth is gone, where is the family? When the truth is known, where is the world?'
      },
      {
        number: 11,
        sanskrit: ['मा कुरु धनजनयौवनगर्वं, हरति निमेषात्कालः सर्वम् ।', 'मायामयमिदमखिलं हित्वा, ब्रह्मपदं त्वं प्रविश विदित्वा ॥'],
        hindi: 'धन, जन और यौवन का गर्व मत करो। काल एक क्षण में यह सब हर लेता है। इस सारे मायामय जगत को त्यागकर और तत्त्व को जानकर ब्रह्मपद में प्रवेश करो।',
        english: 'Do not be proud of wealth, people, or youth. Time steals everything in a moment. Leaving aside this entire world of illusion, know the truth and enter the state of Brahman.'
      },
      {
        number: 12,
        sanskrit: ['दिनयामिन्यौ सायं प्रातः, शिशिरवसन्तौ पुनरायातः ।', 'कालः क्रीडति गच्छत्यायुः, तदपि न मुञ्चत्याशावायुः ॥'],
        hindi: 'दिन और रात, शाम और सुबह, सर्दी और वसंत बार-बार आते-जाते रहते हैं। काल क्रीड़ा करता है और आयु बीतती जाती है, फिर भी आशा का बंधन नहीं छूटता।',
        english: 'Day and night, evening and morning, winter and spring come and go. Time plays and life passes away, yet the grip of hope does not leave.'
      },
      {
        number: 13,
        sanskrit: ['का ते कान्ता धनगतचिन्ता, वातुल किं तव नास्ति नियन्ता ।', 'त्रिजगति सज्जनसङ्गतिरेका, भवति भवार्णवतरणे नौका ॥'],
        hindi: 'तुम्हारी पत्नी कौन है? धन की चिंता क्यों करते हो? हे वाचाल, क्या तुम्हारा कोई नियंत्रक नहीं है? तीनों लोकों में एकमात्र सत्पुरुषों का संग ही इस भवसागर को पार करने के लिए नौका है।',
        english: 'Why this worry about wife and wealth? O distracted one, is there no one to guide you? In the three worlds, only the company of the good is the boat that can cross the ocean of existence.'
      },
      {
        number: 14,
        sanskrit: ['जटिलो मुण्डी लुञ्छितकेशः, काषायाम्बरबहुकृतवेषः ।', 'पश्यन्नपि च न पश्यति मूढः, उदरनिमित्तं बहुकृतवेषः ॥'],
        hindi: 'कोई जटाधारी है, कोई मुंडा है, किसी ने बाल उखाड़ रखे हैं, कोई गेरुए वस्त्र पहनकर अनेक वेश बनाता है। यह मूढ़ देखते हुए भी नहीं देखता कि यह सब पेट भरने के लिए ही किया गया अनेक प्रकार का वेश है।',
        english: 'One has matted locks, another a shaven head, another has plucked his hair. Some wear ochre robes in various guises. The fool sees, yet does not see, that all this is but a variety of disguises for the sake of the belly.'
      },
      {
        number: 15,
        sanskrit: ['अङ्गं गलितं पलितं मुण्डं, दशनविहीनं जातं तुण्डम् ।', 'वृद्धो याति गृहीत्वा दण्डं, तदपि न मुञ्चत्याशापिण्डम् ॥'],
        hindi: 'शरीर गल गया है, सिर के बाल सफेद हो गए हैं, मुँह दाँतों से रहित हो गया है। बूढ़ा व्यक्ति लाठी पकड़कर चलता है, फिर भी आशाओं का पिंड नहीं छोड़ता।',
        english: 'The body has decayed, the head has turned grey, the mouth is toothless. The old man moves with a staff, yet he does not let go of the bundle of desires.'
      },
      {
        number: 16,
        sanskrit: ['अग्रे वह्निः पृष्ठे भानुः, रात्रौ चुबुकसमर्पितजानुः ।', 'करतलभिक्षस्तरुतलवासः, तदपि न मुञ्चत्याशापाशः ॥'],
        hindi: 'आगे आग है, पीछे सूर्य है, रात में घुटनों को ठोड़ी से सटाकर रहता है। हाथ में भिक्षा का पात्र है और पेड़ के नीचे निवास है, फिर भी आशा का बंधन नहीं छूटता।',
        english: 'Fire in front, the sun at the back, at night he huddles with his chin on his knees. He begs for alms with his palms and lives under a tree, yet the noose of desire does not leave him.'
      },
      {
        number: 17,
        sanskrit: ['कुरुते गङ्गासागरगमनं, व्रतपरिपालनमथवा दानम् ।', 'ज्ञानविहीने सर्वमतेन, मुक्तिर्न भवति जन्मशतेन ॥'],
        hindi: 'कोई गंगासागर की यात्रा करता है, व्रतों का पालन करता है अथवा दान देता है। किन्तु सभी मतों के अनुसार, ज्ञान के बिना सौ जन्मों में भी मुक्ति नहीं होती।',
        english: 'One may go on pilgrimage to the confluence of the Ganges and the ocean, observe vows, or give charity. But according to all schools of thought, without knowledge, liberation is not achieved even in a hundred lifetimes.'
      },
      {
        number: 18,
        sanskrit: ['सुरमन्दिरतरुमूलनिवासः, शय्या भूतलमजिनं वासः ।', 'सर्वपरिग्रहभोगत्यागः, कस्य सुखं न करोति विरागः ॥'],
        hindi: 'देव मंदिर या पेड़ के नीचे निवास, पृथ्वी ही शय्या और मृगचर्म ही वस्त्र। सभी संग्रह और भोगों का त्याग - ऐसा वैराग्य किसे सुख नहीं देगा?',
        english: 'Dwelling in a temple or at the foot of a tree, sleeping on the bare ground, wearing deerskin. Giving up all possessions and enjoyments - for whom will such dispassion not bring happiness?'
      },
      {
        number: 19,
        sanskrit: ['योगरतो वा भोगरतो वा, सङ्गरतो वा सङ्गविहीनः ।', 'यस्य ब्रह्मणि रमते चित्तं, नन्दति नन्दति नन्दत्येव ॥'],
        hindi: 'चाहे कोई योग में रत हो या भोग में, संग में हो या निःसंग। जिसका चित्त ब्रह्म में रमता है, वह आनंदित होता है, आनंदित होता है, और आनंदित ही होता है।',
        english: 'Whether one is engrossed in yoga or in worldly pleasures, in company or in solitude. He whose mind delights in Brahman, rejoices, rejoices, and rejoices indeed.'
      },
      {
        number: 20,
        sanskrit: ['भगवद्गीता किञ्चिदधीता, गङ्गाजललवकणिका पीता ।', 'सकृदपि यस्य मुरारिसमर्चा, क्रियते तस्य यमेन न चर्चा ॥'],
        hindi: 'जिसने भगवद्गीता का थोड़ा भी अध्ययन किया है, गंगाजल का एक कण भी पिया है, और जिसने एक बार भी मुरारि (कृष्ण) की पूजा की है, यमराज भी उससे चर्चा नहीं करते।',
        english: 'For one who has studied the Bhagavad Gita even a little, drunk a drop of Ganges water, and worshipped Murari (Krishna) even once, there is no debate with Yama (the god of death).'
      },
      {
        number: 21,
        sanskrit: ['पुनरपि जननं पुनरपि मरणं, पुनरपि जननीजठरे शयनम् ।', 'इह संसारे बहुदुस्तारे, कृपयापारे पाहि मुरारे ॥'],
        hindi: 'बार-बार जन्म, बार-बार मृत्यु, बार-बार माँ के गर्भ में शयन। इस अत्यंत कठिन संसार में, हे अपार कृपा वाले मुरारि, मेरी रक्षा करो!',
        english: 'Again birth, again death, again lying in the mother\'s womb. In this world, which is so hard to cross, O Murari, with your boundless compassion, please protect me!'
      },
      {
        number: 22,
        sanskrit: ['रथ्याचर्पटविरचितकन्थः, पुण्यापुण्यविवर्जितपन्थः ।', 'योगी योगनियोजितचित्तो, रमते बालोन्मत्तवदेव ॥'],
        hindi: 'जो रास्ते में पड़े चिथड़ों से बनी गुदड़ी पहनता है, जो पुण्य और पाप से रहित मार्ग पर चलता है। ऐसा योगी, जिसका चित्त योग में लगा है, वह बालक या पागल की तरह आनंद में रहता है।',
        english: 'Wearing a patched garment made of rags from the street, following a path beyond virtue and vice. The yogi whose mind is absorbed in yoga rejoices like a child or a madman.'
      },
      {
        number: 23,
        sanskrit: ['कस्त्वं कोऽहं कुत आयातः, का मे जननी को मे तातः ।', 'इति परिभावय सर्वमसारम्, विश्वं त्यक्त्वा स्वप्नविचारम् ॥'],
        hindi: 'तुम कौन हो? मैं कौन हूँ? कहाँ से आया हूँ? मेरी माँ कौन है? मेरे पिता कौन हैं? इस प्रकार विचार करो और इस सारे सारहीन संसार को एक स्वप्न के समान त्याग दो।',
        english: 'Who are you? Who am I? From where have I come? Who is my mother? Who is my father? Inquire thus, and giving up the entire world as an unessential dream, reflect upon it.'
      },
      {
        number: 24,
        sanskrit: ['त्वयि मयि चान्यत्रैको विष्णुः, व्यर्थं कुप्यसि मय्यसहिष्णुः ।', 'भव समचित्तः सर्वत्र त्वं, वाञ्छस्यचिराद्यदि विष्णुत्वम् ॥'],
        hindi: 'तुझमें, मुझमें और अन्यत्र भी एक ही विष्णु है। तुम व्यर्थ ही मुझ पर असहिष्णु होकर क्रोध करते हो। यदि तुम शीघ्र ही विष्णुत्व (ईश्वरत्व) प्राप्त करना चाहते हो, तो सर्वत्र समचित्त हो जाओ।',
        english: 'In you, in me, and elsewhere there is but one Vishnu. You are getting angry with me unnecessarily, being intolerant. If you wish to attain the state of Vishnu soon, be even-minded everywhere.'
      },
      {
        number: 25,
        sanskrit: ['शत्रौ मित्रे पुत्रे बन्धौ, मा कुरु यत्नं विग्रहसन्धौ ।', 'सर्वस्मिन्नपि पश्यात्मानं, सर्वत्रोत्सृज भेदाज्ञानम् ॥'],
        hindi: 'शत्रु, मित्र, पुत्र और बंधु में विग्रह (लड़ाई) और संधि (सुलह) के लिए यत्न मत करो। सब में अपने आप को ही देखो और सर्वत्र भेद के अज्ञान को त्याग दो।',
        english: 'Do not strive for war or peace with friend or foe, son or relative. See the Self in everyone, and give up the ignorance of differentiation everywhere.'
      },

      {
        number: 26,
        sanskrit: ['कामं क्रोधं लोभं मोहं, त्यक्त्वात्मानं भावय कोऽहम् ।', 'आत्मज्ञानविहीना मूढाः, ते पच्यन्ते नरकनिगूढाः ॥'],
        hindi: 'काम, क्रोध, लोभ और मोह को त्यागकर, आत्मा का चिंतन करो कि "मैं कौन हूँ"। जो आत्मज्ञान से रहित मूढ़ हैं, वे नरक में डाले जाकर पचते हैं (कष्ट भोगते हैं)।',
        english: 'Giving up desire, anger, greed, and delusion, reflect on your Self and inquire "Who am I?". Those devoid of Self-knowledge are fools; they are cooked in the hidden fires of hell.'
      },
      {
        number: 27,
        sanskrit: ['गेयं गीतानामसहस्रं, ध्येयं श्रीपतिरूपमजस्रम् ।', 'नेयं सज्जनसङ्गे चित्तं, देयं दीनजनाय च वित्तम् ॥'],
        hindi: 'भगवद्गीता और विष्णुसहस्रनाम का गान करना चाहिए, निरंतर श्रीपति (विष्णु) के रूप का ध्यान करना चाहिए। चित्त को सज्जनों के संग में लगाना चाहिए, और दीन-दुखियों को धन देना चाहिए।',
        english: 'The Bhagavad Gita and the thousand names of Vishnu should be sung, the form of the Lord of Lakshmi (Vishnu) should be constantly meditated upon. The mind should be led to the company of the good, and wealth should be given to the needy.'
      },
      {
        number: 28,
        sanskrit: ['सुखतः क्रियते रामाभोगः, पश्चाद्धन्त शरीरे रोगः ।', 'यद्यपि लोके मरणं शरणं, तदपि न मुञ्चति पापाचरणम् ॥'],
        hindi: 'मनुष्य सुख के लिए शारीरिक भोग करता है, जिसके परिणामस्वरूप शरीर में रोग उत्पन्न होते हैं। यद्यपि संसार में मृत्यु ही निश्चित आश्रय है, फिर भी व्यक्ति पाप का आचरण नहीं छोड़ता।',
        english: 'One readily engages in carnal pleasures, but afterwards, alas, comes disease of the body. Although death is the certain end in this world, man does not give up sinful behavior.'
      },
      {
        number: 29,
        sanskrit: ['अर्थमनर्थं भावय नित्यं, नास्ति ततः सुखलेशः सत्यम् ।', 'पुत्रादपि धनभाजां भीतिः, सर्वत्रैषा विहिता रीतिः ॥'],
        hindi: 'धन को अनर्थ समझो, यह नित्य विचार करो। सचमुच इससे लेशमात्र भी सुख नहीं है। धनवानों को तो अपने पुत्रों से भी भय होता है - यह रीति सर्वत्र देखी जाती है।',
        english: 'Constantly reflect that wealth is calamitous; truly, there is not the least happiness in it. For the wealthy, there is fear even from their own sons. This is the way of things everywhere.'
      },
      {
        number: 30,
        sanskrit: ['प्राणायामं प्रत्याहारं, नित्यानित्य विवेकविचारम् ।', 'जाप्यसमेतसमाधिविधानं, कुर्ववधानं महदवधानम् ॥'],
        hindi: 'प्राणायाम, प्रत्याहार, नित्य-अनित्य का विवेक-विचार, और जाप सहित समाधि का विधान - इन सबमें बहुत अधिक अवधान (सावधानी) रखो।',
        english: 'Regulate the breath (pranayama), withdraw the senses (pratyahara), discriminate between the eternal and the transient, and practice japa with meditation (samadhi). Do this with great care, with great care.'
      },
      {
        number: 31,
        sanskrit: ['गुरुचरणाम्बुजनिर्भरभक्तः, संसारादचिराद्भव मुक्तः ।', 'सेन्द्रियमानसनियमादेवं, द्रक्ष्यसि निजहृदयस्थं देवम् ॥'],
        hindi: 'गुरु के चरण-कमलों का अनन्य भक्त बनकर, तुम शीघ्र ही संसार से मुक्त हो जाओगे। इस प्रकार इंद्रियों और मन को नियंत्रित करके, तुम अपने हृदय में स्थित देव (आत्मा) का दर्शन करोगे।',
        english: 'O devotee of the lotus feet of the Guru! May you be soon liberated from the world. Through the control of your senses and mind, you will thus behold the deity that resides in your own heart.'
      },
       {
        number: 32,
        sanskrit: ['भजगोविन्दं भजगोविन्दं, गोविन्दं भजमूढमते ।', 'नामस्मरणादन्यमुपायं, नहि पश्यामो भवाब्धितरणे ॥'],
        hindi: 'गोविन्द का भजन कर, गोविन्द का भजन कर, गोविन्द का ही भजन कर, हे मूढ़बुद्धि! नाम-स्मरण के अतिरिक्त इस भवसागर को पार करने का अन्य कोई उपाय हम नहीं देखते।',
        english: 'Worship Govinda, worship Govinda, worship Govinda, O deluded mind! Other than chanting the Lord\'s names, I see no other way to cross the ocean of life.'
      }
    ]
  },
];
