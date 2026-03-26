export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isSignature?: boolean;
  isMustTry?: boolean;
}

export interface MenuCategory {
  category: string;
  description?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    category: "CHAI + BICOOTS",
    description: "Milk Tea, Medium Sugar",
    items: [
      { name: "CUTTING CHAI", price: "₹160", description: "More Milk, Less Water\nआधी चाय पूरा attitude, naam toh suna hoga!" },
      { name: "MASALA CHAI", price: "₹220", description: "बिकॉज़ plain chai is just being polite" },
      { name: "SHARE MARKET CHAI", price: "₹220", description: "For the bulls & bears from the calcutta stock exchange" },
      { name: "KESARIYA CHAI", price: "₹250", description: "Kesar chai that sips like poetry in a kulhad" },
      { name: "ELAINCHI WALI CUTTING CHAI (स्पेशल)", price: "₹180", description: "A strong, no-nonsense spiced chai - Mumbai's favourite quick fix in a glass" },
    ]
  },
  {
    category: "GREEN TEA",
    description: "No Milk. No Sugar",
    items: [
      { name: "ORGANIC (ऑर्गेनिक) GREEN", price: "₹160" }
    ]
  },
  {
    category: "BLACK TEA",
    description: "No Milk. No Sugar",
    items: [
      { name: "LEBU APPLE CHAI", price: "₹250", isSignature: true, isMustTry: true },
      { name: "ASSAM", price: "₹160" },
      { name: "DARJEELING", price: "₹160" },
      { name: "EARL GREY", price: "₹160" },
    ]
  },
  {
    category: "HERBAL INFUSIONS",
    description: "No Milk. No Sugar",
    items: [
      { name: "ROSE (गुलाब खास)", price: "₹160" },
      { name: "HIBISCUS (इम्यूनिटी बूस्टर)", price: "₹160" },
      { name: "CHAMOMILE", price: "₹160" },
      { name: "TULSI - GINGER & HONEY", price: "₹250", description: "A soothing brew of robust tea and fresh ginger, perfect for warmth and a gentle kick", isSignature: true },
    ]
  },
  {
    category: "COFFEE & COOKIES",
    items: [
      { name: "ESPRESSO", price: "₹200" },
      { name: "AMERICANO", price: "₹225" },
      { name: "CAPPUCCINO", price: "₹250" },
      { name: "CLASSIC COLD COFFEE", price: "₹250" },
    ]
  },
  {
    category: "COLD STUFF",
    items: [
      { name: "NUTELLA SHAKE", price: "₹350" },
      { name: "SEASONAL FRUIT SHAKE", price: "₹280", description: "Mango / Jamun / Chikoo" },
      { name: "SHARBAT", price: "₹280", description: "Prepared with fresh flowers & fruit\nGulab / Bela / Bel / Hibiscus", isMustTry: true },
      { name: "ICED TEA", price: "₹250" },
      { name: "FRESH LIME SODA", price: "₹250" },
      { name: "GONDHARAJ NEBU MASALA SHIKANJI", price: "₹200" },
      { name: "AAM PANI (SEASONAL)", price: "₹200" },
      { name: "FRESH COCONUT WATER", price: "₹200" },
      { name: "DOODH COLA (शरमा जी तरह)", price: "₹180" },
      { name: "MASALA COLA", price: "₹180" },
      { name: "COTTONS ICE CREAM SODA", price: "₹200" },
      { name: "SOFT DRINKS", price: "₹200" },
      { name: "BOTTLED WATER 750 ML", price: "₹350" },
    ]
  },
  {
    category: "SALADS",
    items: [
      { name: "BOWL OF SPROUTS", price: "₹250", description: "अंकुरित दाने सेहत के अफ़साने" },
      { name: "BUCKWHEAT & GREENS", price: "₹450", description: "Hearty grains meet garden greens.", isSignature: true },
    ]
  },
  {
    category: "NAASHTA",
    items: [
      { name: "DHOKLA TARTS", price: "₹240", description: "Soft, spongy dhokla crashes a tart party - with chutney, crunch, and a whole lot of sass!" },
      { name: "VADA PAV", price: "₹230", description: "Mumbai's iconic burger - fiery vada, soft pav, and a punch of chutney in every bite" },
      { name: "SINGHARA PLATTER", price: "₹240", description: "Stuffed with spice, mischief, and pure nostalgia!" },
      { name: "ALOO DUM (CHAAT STYLE)", price: "₹300", description: "Slow-cooked, spiced up, and ready to steal the show" },
      { name: "CALCUTTA MEZZE PLATTER", price: "₹400", description: "Gathiya, nimki & mathri served with dips and अचार", isSignature: true },
      { name: "CALCUTTA PHUCHKA", price: "₹300", description: "Yes NOT paani puri, NOT gol gappe, PHUCHKA!" },
      { name: "JHAL MURI", price: "₹190", description: "A crunchy, tangy whirlwind of flavors - Muri that's a party in your mouth!" },
      { name: "PAPRI CHAAT", price: "₹280", description: "My name is Chaat, Papri Chaat", isMustTry: true, isSignature: true },
      { name: "PERI PERI FRIES", price: "₹240", description: "बिकॉज़ Life is better with fries!" },
    ]
  },
  {
    category: "BREADS",
    items: [
      { name: "BOMBAY ALOO GRILLED SANDWICH", price: "₹280", description: "Layered, loaded, and grilled to glory - Mumbai's spicy street star with a aloo twist!" },
      { name: "BOMBAY PANEER GRILLED SANDWICH", price: "₹300", description: "Stacked with veggies, generous layer of paneer slathered with home made sauce, and grilled to perfection" },
      { name: "CHILLI CHEESE TOAST", price: "₹250", description: "Cheesy, spicy, and dangerously addictive - chilli cheese toast that brings the heat and the hug!" },
      { name: "MALAI TOAST", price: "₹240", description: "That's creamy, dreamy, and delightfully desi!" },
      { name: "CHEESE & KASUNDI TOAST", price: "₹250", isMustTry: true },
      { name: "BAKED BEANS ON TOAST", price: "₹250", description: "Heart shaped bite sized old favourite", isSignature: true },
      { name: "BITE SIZED PIZZA", price: "₹450", description: "आधा pesto, aadha margherita - poora pyaar", isSignature: true },
    ]
  },
  {
    category: "MAGGI",
    items: [
      { name: "FIRANGI MAGGI", price: "₹290", description: "Tossed with global flavours, but still full of sass", isMustTry: true },
      { name: "PESTO MAGGI", price: "₹290", description: "Herby, cheesy, and totally twirl-worthy" },
    ]
  },
  {
    category: "MAINS",
    items: [
      { name: "PAV BHAJI", price: "₹280", description: "A buttery riot of mashed veggies and spice - pav bhaji that's bold & messy", isMustTry: true },
      { name: "THEPLA QUESSADILA", price: "₹350", description: "Stuffed, spiced, and ready to salsa!", isMustTry: true },
      { name: "THEPLA TART", price: "₹300", description: "A Gujarati classic goes rogue - crispy thepla meets its fancy avatar in this cheeky little tart!" },
      { name: "CHILLA WRAP", price: "₹200", description: "The desi pancake with a punch" },
      { name: "KATHI ROLL", price: "₹250", description: "A spicy street-style hug rolled up tight" },
      { name: "PASTA KA VAASTA", price: "₹450", description: "फॉरेन maal" },
      { name: "DHAKAI PARATHA WITH ALOO & GHOOGHNI", price: "₹350", description: "Paratha so flaky, it has more layers than your EX", isSignature: true },
      { name: "DAL PAKWAAN", price: "₹350", description: "Hearty daal meets its crisp partner-in-crime, the pakwaan" },
      { name: "BIRYANI", price: "₹450", description: "दम से बना, दम से भरा" },
      { name: "PIND PLATTER (service from 7pm - 10:30pm)", price: "₹850", description: "Dal makhni, smokey paneer tikka with buttery, cheesy tawa paratha" },
    ]
  },
  {
    category: "DESSERTS",
    items: [
      { name: "MINT PLANT IN CHOCOLATE MUD", price: "₹180", isSignature: true },
      { name: "CHURROS JALEBI", price: "₹350", description: "Crispy churros meet sweet, syrupy jalebi - the ultimate love story of two desserts in one delicious bite!", isMustTry: true, isSignature: true },
      { name: "KULFI OF THE DAY", price: "₹200", description: "PAAN / KESAR / GUAVA" },
      { name: "90'S TREAT", price: "₹280", description: "Orange / Mango stick, Choco Stick & Surpise" },
      { name: "TIRAMISU", price: "₹400" },
      { name: "CLASSIC BROWNIE WITH ICECREAM", price: "₹450" },
    ]
  }
];
