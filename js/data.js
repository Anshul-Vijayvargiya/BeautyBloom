// data.js - Centralized data for Bloom & Blush

const categories = [
  { id: 'hair', name: 'Hair Services' },
  { id: 'skin', name: 'Skin Services' },
  { id: 'nails', name: 'Nail Services' },
  { id: 'makeup', name: 'Makeup Services' },
  { id: 'spa', name: 'Spa & Massage' },
  { id: 'waxing', name: 'Waxing & Threading' }
];

const services = [
  // Hair
  { id: 'h1', category: 'hair', name: 'Signature Haircut & Style', price: 899, duration: 45, desc: 'Expert scissor cut with personalized styling advice.' },
  { id: 'h2', category: 'hair', name: 'Layers & Cut (for length)', price: 1299, duration: 60, desc: 'Add movement and volume with expert layering.' },
  { id: 'h3', category: 'hair', name: 'Blow Dry & Styling', price: 599, duration: 30, desc: 'Professional wash followed by a bouncy blowout.' },
  { id: 'h4', category: 'hair', name: 'Hair Color - Single Process', price: 2499, duration: 90, desc: 'Global hair color for a complete transformation.' },
  { id: 'h5', category: 'hair', name: 'Hair Color - Roots Only Touch-up', price: 1499, duration: 60, desc: 'Seamless root touch-up for flawless color.' },
  { id: 'h6', category: 'hair', name: 'Balayage / Highlights', price: 4999, duration: 150, desc: 'Hand-painted highlights for a natural, sun-kissed look.' },
  { id: 'h7', category: 'hair', name: 'Keratin Hair Smoothening', price: 5999, duration: 180, desc: 'Frizz-reducing protein treatment for smooth, manageable hair.' },
  { id: 'h8', category: 'hair', name: 'Protein Treatment (Conditioning)', price: 1299, duration: 60, desc: 'Deep conditioning treatment to restore hair health.' },
  { id: 'h9', category: 'hair', name: 'Hair Spa (Deep Conditioning)', price: 999, duration: 45, desc: 'Relaxing spa treatment for intense hair hydration.' },

  // Skin
  { id: 's1', category: 'skin', name: 'Classic European Facial', price: 1499, duration: 60, desc: 'Customized facial to cleanse, exfoliate, and hydrate.' },
  { id: 's2', category: 'skin', name: 'Hydrating Facial with Hyaluronic Acid', price: 1999, duration: 75, desc: 'Intense hydration boost for plump, glowing skin.' },
  { id: 's3', category: 'skin', name: 'Gold Radiance Facial', price: 2499, duration: 75, desc: 'Premium facial infused with gold for ultimate radiance.' },
  { id: 's4', category: 'skin', name: 'Anti-Ageing Facial', price: 2999, duration: 75, desc: 'Targeted treatment to reduce fine lines and firm skin.' },
  { id: 's5', category: 'skin', name: 'De-Tan Treatment', price: 999, duration: 45, desc: 'Effective removal of sun tan to reveal brighter skin.' },
  { id: 's6', category: 'skin', name: 'Body Polishing (Full Body)', price: 1799, duration: 60, desc: 'Full body exfoliation and hydration for silky smooth skin.' },
  { id: 's7', category: 'skin', name: 'Chemical Peel 30% Glycolic', price: 1499, duration: 45, desc: 'Advanced peel treatment for skin renewal and texture improvement.' },

  // Nails
  { id: 'n1', category: 'nails', name: 'Classic Manicure', price: 599, duration: 40, desc: 'Nail shaping, cuticle care, and regular polish application.' },
  { id: 'n2', category: 'nails', name: 'Gel Manicure', price: 999, duration: 60, desc: 'Long-lasting, chip-free gel color application.' },
  { id: 'n3', category: 'nails', name: 'Acrylic Nails (Full Set)', price: 1499, duration: 90, desc: 'Full set of sculpted acrylic extensions.' },
  { id: 'n4', category: 'nails', name: 'Classic Pedicure', price: 699, duration: 45, desc: 'Includes foot soak, scrub, massage, and polish.' },
  { id: 'n5', category: 'nails', name: 'Gel Pedicure', price: 999, duration: 60, desc: 'Long-lasting gel polish with complete foot care.' },
  { id: 'n6', category: 'nails', name: 'Nail Art (per hand, simple)', price: 499, duration: 30, desc: 'Elegant and simple nail art designs.' },
  { id: 'n7', category: 'nails', name: 'Nail Art (per hand, complex)', price: 799, duration: 45, desc: 'Intricate and detailed custom nail art.' },

  // Makeup
  { id: 'm1', category: 'makeup', name: 'Everyday Makeup (natural look)', price: 1499, duration: 45, desc: 'Enhance your natural beauty with a soft, glowing finish.' },
  { id: 'm2', category: 'makeup', name: 'Party/Evening Makeup (glam)', price: 2499, duration: 60, desc: 'Flawless makeup base with an elegant evening look.' },
  { id: 'm3', category: 'makeup', name: 'Bridal Makeup (Trial)', price: 3999, duration: 90, desc: 'Preview and perfect your bridal look before the big day.' },
  { id: 'm4', category: 'makeup', name: 'Bridal Makeup (Wedding Day)', price: 9999, duration: 120, desc: 'The ultimate bridal glam for a flawless wedding day look.' },
  { id: 'm5', category: 'makeup', name: 'HD Airbrush Makeup', price: 3499, duration: 60, desc: 'High-definition airbrush finish perfect for photography.' },
  { id: 'm6', category: 'makeup', name: 'Makeup with Hair Styling', price: 4999, duration: 120, desc: 'Complete hair and makeup transformation package.' },

  // Spa
  { id: 'sp1', category: 'spa', name: 'Swedish Full Body Massage (30 min)', price: 899, duration: 30, desc: 'Quick relaxation massage to ease tension.' },
  { id: 'sp2', category: 'spa', name: 'Swedish Full Body Massage (60 min)', price: 1499, duration: 60, desc: 'Relaxing full-body massage to improve circulation.' },
  { id: 'sp3', category: 'spa', name: 'Hot Stone Massage', price: 1999, duration: 60, desc: 'Therapeutic massage using heated stones for deep muscle relief.' },
  { id: 'sp4', category: 'spa', name: 'Aromatherapy Massage (90 min)', price: 2499, duration: 90, desc: 'Sensory experience using custom essential oil blends.' },
  { id: 'sp5', category: 'spa', name: 'Head & Shoulder Massage', price: 599, duration: 30, desc: 'Targeted relief for upper body stress and tension.' },
  { id: 'sp6', category: 'spa', name: 'Body Polishing with Oil Massage', price: 1799, duration: 75, desc: 'Complete body exfoliation followed by a relaxing oil massage.' },

  // Waxing & Threading
  { id: 'w1', category: 'waxing', name: 'Threading - Eyebrows', price: 149, duration: 15, desc: 'Precise hair removal for perfectly shaped brows.' },
  { id: 'w2', category: 'waxing', name: 'Threading - Upper Lip', price: 99, duration: 10, desc: 'Gentle hair removal for the upper lip area.' },
  { id: 'w3', category: 'waxing', name: 'Threading - Full Face', price: 299, duration: 30, desc: 'Complete facial hair threading for a smooth finish.' },
  { id: 'w4', category: 'waxing', name: 'Wax - Full Legs', price: 499, duration: 45, desc: 'Smooth, hair-free legs with our gentle wax.' },
  { id: 'w5', category: 'waxing', name: 'Wax - Underarms', price: 199, duration: 15, desc: 'Quick and effective underarm waxing.' },
  { id: 'w6', category: 'waxing', name: 'Wax - Bikini Line', price: 299, duration: 20, desc: 'Precise bikini line waxing for a clean look.' },
  { id: 'w7', category: 'waxing', name: 'Wax - Brazilian (Full)', price: 599, duration: 30, desc: 'Complete hair removal using hard wax for maximum comfort.' },
  { id: 'w8', category: 'waxing', name: 'Wax - Face (upper lip, chin, cheeks)', price: 299, duration: 25, desc: 'Gentle facial waxing for sensitive skin.' }
];

const galleryImages = [
  'ChatGPT Image Sep 6, 2026, 11_12_09 AM.png',
  'ChatGPT Image Sep 6, 2026, 11_18_41 AM.png',
  'bridal makeup & hairstyle & jewelry.jpg',
  'A photograph of a traditional Indian bride in a richly embroidered saree, adorned with jewelry and f.jpg',
  'Radiant Haldi Bridal Makeup Look _ Yellow Floral Jewelry Inspiration.jpg',
  'Elegant Mumbai Wedding With The Bride In A Beautiful Pastel Pink Lehenga.jpg'
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Bride',
    text: '"The team at Bloom & Blush made me feel like absolute royalty on my wedding day. The makeup lasted all night and my hair was flawless!"',
    image: 'Creatine work.jpg'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Regular Client',
    text: '"I\'ve been coming here for my balayage for two years. The attention to detail is unmatched, and the salon\'s atmosphere is incredibly relaxing."',
    image: 'https://i.pravatar.cc/150?img=9'
  },
  {
    name: 'Michelle Chang',
    role: 'First-time Visitor',
    text: '"Hands down the best facial I\'ve ever had. My skin is glowing and the aesthetician was so knowledgeable and gentle."',
    image: 'https://i.pravatar.cc/150?img=20'
  }
];

const team = [
  { name: 'Sofia Ramirez', role: 'Lead Hair Stylist', image: 'Creatine work.jpg' },
  { name: 'Dr. Priya Sharma', role: 'Skin Specialist', image: 'download.jpg' },
  { name: 'Simran Kaur', role: 'Certified Nail Artist', image: 'Cosmetology School Dress Code Inspiration.jpg' },
  { name: 'Aksita Vijayvargiya', role: 'Bridal Makeup Artist', image: 'ChatGPT Image Sep 4, 2026, 12_14_00 PM.png' }
];

// Exporting to global window object so it's accessible without module bundlers
window.salonData = {
  categories,
  services,
  galleryImages,
  testimonials,
  team
};
