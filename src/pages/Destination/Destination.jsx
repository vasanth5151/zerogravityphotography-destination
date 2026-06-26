import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Camera, Star, ArrowRight, Eye, Calendar, Info, Clock, Sun, Plane } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import GalleryLightbox from '../../components/GalleryLightbox/GalleryLightbox';
import andaman from '../../assets/destinations/andaman.webp';
import bali from '../../assets/destinations/bali.webp';
import goa from '../../assets/destinations/goa.webp';
import jaipur from '../../assets/destinations/jaipur.webp';
import kerala from '../../assets/destinations/kerala.webp';
import muscat from '../../assets/destinations/muscat.webp';
import newjersey from '../../assets/destinations/new-jersey.webp';
import paris from '../../assets/destinations/paris.webp';
import singapore from '../../assets/destinations/singapore.webp';
import srilanka from '../../assets/destinations/srilanka.webp';
import us from '../../assets/destinations/us.webp';
// USA gallery images
import usa1 from '../../assets/usa/usa-1.jpg';
import usa2 from '../../assets/usa/usa-2.jpg';
import usa3 from '../../assets/usa/usa-3.jpg';
import usa4 from '../../assets/usa/usa-4.jpg';
import usa5 from '../../assets/usa/usa-5.jpg';
import usa6 from '../../assets/usa/usa-6.jpg';
import usa7 from '../../assets/usa/usa-7.jpg';
import usa8 from '../../assets/usa/usa-8.webp';
import usa9 from '../../assets/usa/usa-9.webp';
import usa10 from '../../assets/usa/usa-10.webp';
import usa11 from '../../assets/usa/usa-11.webp';
// Paris gallery images
import paris1 from '../../assets/paris/Paris1.jpg';
import paris2 from '../../assets/paris/Paris2.jpg';
import paris3 from '../../assets/paris/Paris3.jpg';
import paris4 from '../../assets/paris/Paris4.jpg';
import paris5 from '../../assets/paris/Paris5.jpg';
import paris6 from '../../assets/paris/Paris6.jpg';
// Sri Lanka gallery images
import srilanka1 from '../../assets/srilanka/srilanka-1.jpg';
import srilanka2 from '../../assets/srilanka/srilanka-2.jpg';
import srilanka3 from '../../assets/srilanka/srilanka-3.jpg';
import srilanka4 from '../../assets/srilanka/srilanka-4.jpg';
import srilanka5 from '../../assets/srilanka/srilanka-5.jpg';
import srilanka6 from '../../assets/srilanka/srilanka-6.jpg';
// Muscat gallery images
import muscat1 from '../../assets/muscat/muscat-1.jpg';
import muscat2 from '../../assets/muscat/muscat-2.jpg';
import muscat3 from '../../assets/muscat/muscat-3.jpg';
import muscat4 from '../../assets/muscat/muscat-4.jpg';
import muscat5 from '../../assets/muscat/muscat-5.jpg';
import muscat6 from '../../assets/muscat/muscat-6.jpg';
import muscat7 from '../../assets/muscat/muscat-7.jpg';
import muscat8 from '../../assets/muscat/muscat-8.jpg';
// Kerala gallery images
import kerala1 from '../../assets/kerala/kerala-1.jpg';
import kerala2 from '../../assets/kerala/kerala-2.jpg';
import kerala3 from '../../assets/kerala/kerala-3.jpg';
import kerala4 from '../../assets/kerala/kerala-4.jpg';
import kerala5 from '../../assets/kerala/kerala-5.jpg';
import kerala6 from '../../assets/kerala/kerala-6.jpg';
import kerala7 from '../../assets/kerala/kerala-7.jpg';
import kerala8 from '../../assets/kerala/kerala-8.jpg';
// Jaipur gallery images
import jaipur1 from '../../assets/jaipur/jaipur-1.jpg';
import jaipur2 from '../../assets/jaipur/jaipur-2.jpg';
import jaipur3 from '../../assets/jaipur/jaipur-3.jpg';
import jaipur4 from '../../assets/jaipur/jaipur-4.jpg';
import jaipur5 from '../../assets/jaipur/jaipur-5.jpg';
import jaipur6 from '../../assets/jaipur/jaipur-6.jpg';
import jaipur7 from '../../assets/jaipur/jaipur-7.jpg';
// Goa gallery images
import goa1 from '../../assets/goa/goa-1.jpg';
import goa2 from '../../assets/goa/goa-2.jpg';
import goa3 from '../../assets/goa/goa-3.jpg';
import goa4 from '../../assets/goa/goa-4.jpg';
import goa5 from '../../assets/goa/goa-5.jpg';
import goa6 from '../../assets/goa/goa-6.jpg';
// Bali gallery images
import bali1 from '../../assets/bali/Bali1.jpg';
import bali2 from '../../assets/bali/Bali2.jpg';
import bali3 from '../../assets/bali/Bali3.jpg';
import bali4 from '../../assets/bali/Bali4.jpg';
import bali5 from '../../assets/bali/Bali5.jpg';
import bali6 from '../../assets/bali/Bali6.jpg';
// Andaman gallery images
import andaman1 from '../../assets/andaman/Andaman1.jpg';
import andaman2 from '../../assets/andaman/Andaman2.jpg';
import andaman3 from '../../assets/andaman/Andaman3.jpg';
import andaman4 from '../../assets/andaman/Andaman4.jpg';
import andaman5 from '../../assets/andaman/Andaman5.jpg';
import andaman6 from '../../assets/andaman/Andaman6.jpg';

// Sample visual assets for premium destination wedding page
const VENUES = [
  {
    id: 'scorrier',
    title: 'SCORRIER HOUSE',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'roderick',
    title: 'RODERICK CASTLE & PAVILION',
    location: 'SCOTLAND',
    image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'garthmyl',
    title: 'GARTHMYL HALL',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'casa-arte',
    title: 'CASA ARTE LAGO',
    location: 'PORTUGAL',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    category: 'paris'
  },
  {
    id: 'fraser',
    title: 'FRASER RIVER LODGE',
    location: 'CANADA',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    category: 'united-states'
  },
  {
    id: 'sea-view',
    title: 'SEA VIEW BY DE RIGO',
    location: 'GREECE',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    category: 'bali'
  },
  {
    id: 'hotham',
    title: 'HOTHAM HALL ESTATE',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  }
];

const POPULAR_DESTINATIONS = [
  {
    name: 'UNITED STATES',
    desc: 'California & East Coast Manors',
    image: us
  },
  {
    name: 'NEW JERSEY',
    desc: 'Luxury Private Estates',
    image: newjersey
  },
  {
    name: 'SINGAPORE',
    desc: 'Metropolitan Gardens & Skylines',
    image: singapore
  },
  {
    name: 'PARIS',
    desc: 'Classic Seine Courtyards',
    image: paris
  },
  {
    name: 'MUSCAT',
    desc: 'Desert Oases & Luxury Resorts',
    image: muscat
  },
  {
    name: 'JAIPUR',
    desc: 'Royal Palaces of the Pink City',
    image: jaipur
  },
  {
    name: 'GOA',
    desc: 'Tropical Beachfront Vows',
    image: goa
  },
  {
    name: 'BALI',
    desc: 'Cliffside Jungles & Temples',
    image: bali
  },
  {
    name: 'SRILANKA',
    desc: 'Tea Country & Coastal Elegance',
    image: srilanka
  },
  {
    name: 'ANDAMAN',
    desc: 'Exotic Turquoise Ocean Vows',
    image: andaman
  },
  {
    name: 'KERALA',
    desc: 'Backwaters & Luxury Lagoons',
    image: kerala
  }
];

const PHOTOGRAPHERS = [
  {
    name: 'RAHEL DEBBOUEK PHOTOGRAPHY',
    website: 'www.raheldebbouek.com',
    location: 'Europe & International',
    image: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'SYLVIA ZIERA',
    website: 'www.sylviaziera.com',
    location: 'Poland & Worldwide',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'LISA LITVINOVICH PHOTOGRAPHY',
    website: 'www.lisalitvinovich.com',
    location: 'Europe & UK Alliance',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
  }
];

const REAL_WEDDINGS = [
  {
    title: 'A PALACE GARDEN WEDDING WITH A NOD TO THE TUSCAN RUSTIC',
    location: 'TUSCANY, ITALY',
    image: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'WHEN A HOCKEY CAREER PATH INSPIRED A COZY EUROPEAN WEDDING',
    location: 'ZERMATT, SWITZERLAND',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'SATIN & STAIRCASE: THE ART OF SYLVIA ZIERA AT WROTHAM HALL',
    location: 'KENT, UNITED KINGDOM',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80'
  }
];

const DESTINATION_PROFILES = {
  'united-states': {
    name: 'United States',
    tagline: 'LUXURY MANOR ESTATES & BREATHTAKING CLIFFS',
    heroImage: us,
    intro: 'From the historical elegance of East Coast manors to the epic coastal cliffs of California, the United States offers a diverse canvas for luxury destination weddings. Zero Gravity captures every editorial moment against these iconic backdrops.',
    bestSeason: 'May to October (15°C - 26°C)',
    shoulderSeason: 'April & November (10°C - 20°C)',
    airports: 'JFK (New York), LAX (Los Angeles), SFO (San Francisco)',
    regions: 'Napa Valley, Long Island, Big Sur, Newport, Miami',
    bullets: [
      'Historic golden-age mansion settings',
      'Dramatic Pacific coastline backdrops',
      'Vast scenic vineyards and wineries',
      'World-class Michelin-star hospitality teams'
    ],
    venues: [
      { title: 'The Meadowwood Estate', loc: 'Napa Valley, CA', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'Oheka Castle', loc: 'Long Island, NY', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Post Ranch Inn', loc: 'Big Sur, CA', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Breakers', loc: 'Palm Beach, FL', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Vanderbilt Mansion', loc: 'Newport, RI', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'MANORS, CLIFFS & VINEYARDS',
    venueTypesText: 'The United States offers a rich tapestry of venue options, from historic stone manors in New England to sweeping seaside resorts in California.',
    venueTypesList: [
      { type: 'MANOR ESTATES', desc: 'Grand estates featuring manicured lawns, historic architecture, and extensive formal gardens.' },
      { type: 'COASTAL RESORTS', desc: 'Luxurious clifftop settings offering panoramic ocean views and private beach access.' },
      { type: 'VINEYARD RETREATS', desc: 'Serene valley properties surrounded by rolling hills, rustic barrel rooms, and organic gardens.' }
    ],
    traditionsText: 'Gastronomy ranges from East Coast seafood banquets to California organic farm-to-table dining, accompanied by stellar local wines. Celebrations often feature live jazz bands and multi-day outdoor welcome soirées.',
    gallery: [usa1, usa2, usa3, usa4, usa5, usa6]
  },
  'new-jersey': {
    name: 'New Jersey',
    tagline: 'PRIVATE GARDEN MANSIONS & SOPHISTICATED SOIREES',
    heroImage: newjersey,
    intro: 'Known for its magnificent private estates, sophisticated manor houses, and lush gardens, New Jersey is the epitome of classic, close-to-city luxury. Ideal for couples seeking grand ballrooms and manicured courtyard ceremonies.',
    bestSeason: 'April to June & September to November (12°C - 24°C)',
    shoulderSeason: 'July to August (22°C - 30°C)',
    airports: 'EWR (Newark), JFK (New York), PHL (Philadelphia)',
    regions: 'Cape May, Princeton, Somerset Hills, Jersey Shore',
    bullets: [
      'Lush manicured French gardens',
      'Elegant grand ballroom receptions',
      'Charming historic seaside pavilions',
      'Convenient access for international guests'
    ],
    venues: [
      { title: 'Park Chateau Estate', loc: 'East Brunswick, NJ', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Ashford Estate', loc: 'Allentown, NJ', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Pleasantdale Chateau', loc: 'West Orange, NJ', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Shadowbrook at Shrewsbury', loc: 'Shrewsbury, NJ', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'Mallard Island Yacht Club', loc: 'Manahawkin, NJ', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'CHATEAUX, GARDENS & YACHT CLUBS',
    venueTypesText: 'New Jersey is home to some of the country\'s most spectacular private estates, offering classic European charm just a stone\'s throw from the metropolitan core.',
    venueTypesList: [
      { type: 'CHATEAU MANIONS', desc: 'European-inspired castles featuring limestone fountains, soaring ceilings, and white-glove service.' },
      { type: 'GARDEN RETREATS', desc: 'Intimate estates enclosed by centuries-old oaks, blooming rose gardens, and stone courtyards.' },
      { type: 'COASTAL YACHT CLUBS', desc: 'Sophisticated seaside settings combining waterfront views with nautical elegance.' }
    ],
    traditionsText: 'Cuisine highlights elegant plated multi-course meals featuring local farm ingredients, artisan cheese tables, and premium craft cocktail bars. Weddings are marked by high-energy dance bands and grand sparkler exits.',
    gallery: [usa7, usa8, usa9, usa10, usa11]
  },
  'singapore': {
    name: 'Singapore',
    tagline: 'METROPOLITAN LUXURY GARDENS & ROOFTOP SKYLINE VOWS',
    heroImage: singapore,
    intro: 'Where futuristic gardens meet sky-high modern architecture. Singapore presents an ultra-luxury city setting with lush tropical greenhouses, historic colonial chapels, and breathtaking infinity-pool rooftops.',
    bestSeason: 'Year-round (Indoors recommended, 26°C - 32°C)',
    shoulderSeason: 'February to April (25°C - 31°C)',
    airports: 'SIN (Changi Airport)',
    regions: 'Sentosa Island, Marina Bay, Orchard Road, Dempsey Hill',
    bullets: [
      'Futuristic skyline rooftop venues',
      'Historic colonial chapel settings',
      'Lush climate-controlled biodomes',
      'World-class luxury hotel hospitality'
    ],
    venues: [
      { title: 'Chijmes Hall', loc: 'Victoria Street, SG', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Clifford Pier', loc: 'Marina Bay, SG', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
      { title: 'Capella Singapore', loc: 'Sentosa Island, SG', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: '1-Atico Skyline', loc: 'Orchard Road, SG', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Flower Dome at Gardens by the Bay', loc: 'Marina Bay, SG', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'ROOFTOPS, BIODOMES & COLONIAL CHAPELS',
    venueTypesText: 'Singapore showcases a contrast of ultra-modern glass architecture and historic colonial structures nestled in rich tropical greenery.',
    venueTypesList: [
      { type: 'ROOFTOP SKYLINE', desc: 'High-altitude venues offering 360-degree metropolitan views and stunning infinity backdrops.' },
      { type: 'HERITAGE CHAPELS', desc: 'Restored colonial-era structures with stained-glass details and charming cobblestone plazas.' },
      { type: 'BEACH CLUBS & VILLAS', desc: 'Upscale beachfront venues on Sentosa Island offering relaxed tropical vibes with premium service.' }
    ],
    traditionsText: 'Cuisine blends high-end Michelin-starred Cantonese delicacies, rich Peranakan flavors, and modern French fusion. Traditional tea ceremonies and spectacular indoor laser light shows add a uniquely Singaporean flair.',
    gallery: [paris1, paris2, paris3, paris4, paris5, paris6]
  },
  'paris': {
    name: 'Paris',
    tagline: 'CLASSIC ROMANCE ALONG THE SEINE & CHATEAU COURTYARDS',
    heroImage: paris,
    intro: 'Paris remains the ultimate capital of fine-art romance. Walk through centuries-old palace gardens, elegant Parisian apartments with iron balconies, and grandiose chateaus just outside the city borders.',
    bestSeason: 'April to October (15°C - 25°C)',
    shoulderSeason: 'March & November (8°C - 16°C)',
    airports: 'CDG (Charles de Gaulle), ORY (Orly)',
    regions: 'Seine Riverbanks, Saint-Germain, Versailles, Chantilly',
    bullets: [
      'Breathtaking chateau garden backdrops',
      'Charming private salon receptions',
      'Historic Seine-view photo locations',
      'Exquisite French culinary experiences'
    ],
    venues: [
      { title: 'Chateau de Vaux-le-Vicomte', loc: 'Maincy, France', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Shangri-La Hotel', loc: 'Paris Center, France', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Chateau de Versailles', loc: 'Versailles, France', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Ritz Paris', loc: 'Place Vendôme, France', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'Villa Ephrussi de Rothschild', loc: 'French Riviera, France', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'CHATEAUX, APARTMENTS & GILDED SALONS',
    venueTypesText: 'Paris offers a timeless array of settings, from classical gilded salons within the city to historic chateaux surrounded by moats in the nearby countryside.',
    venueTypesList: [
      { type: 'HISTORIC CHATEAUX', desc: 'Renaissance-style palaces with grand ballrooms, crystal chandeliers, and expansive formal parks.' },
      { type: 'PRIVATE SALONS', desc: 'Sophisticated boutique hotels and townhouses featuring neoclassical wall moldings and gilded ceilings.' },
      { type: 'MUSEUM HALLS', desc: 'Art-filled historical structures providing an unmatched cultural atmosphere for banquets.' }
    ],
    traditionsText: 'Cuisine features haute French gastronomy, delicate pastries (macarons, croquembouche), and world-class vintage champagne. Receptions are known for candlelit tablescapes, classical string quartets, and romantic first dances by the Seine.',
    gallery: [paris1, paris2, paris3, paris4, paris5, paris6]
  },
  'muscat': {
    name: 'Muscat',
    tagline: 'DESERT OASES, ARABIAN PALACES & LUXURY BEACH RESORTS',
    heroImage: muscat,
    intro: 'Muscat offers a majestic backdrop where dramatic mountain ridges meet the Gulf of Oman. Perfect for high-end beachfront venues, luxurious sand-dune elopements, and grand ballroom celebrations.',
    bestSeason: 'October to April (20°C - 28°C)',
    shoulderSeason: 'May & September (28°C - 35°C)',
    airports: 'MCT (Muscat International Airport)',
    regions: 'Qurum Beach, Jebel Akhdar, Al Bustan, Yiti',
    bullets: [
      'Stunning desert mountain backdrops',
      'Opulent grand palace ballrooms',
      'Serene private ocean shores',
      'Authentic Arabian hospitality'
    ],
    venues: [
      { title: 'Al Bustan Palace (Ritz-Carlton)', loc: 'Muscat Coast, Oman', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Chedi Muscat', loc: 'Al Azaiba, Oman', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'Shangri-La Barr Al Jissah', loc: 'Muscat Bay, Oman', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Anantara Al Jabal Al Akhdar', loc: 'Nizwa Mountains, Oman', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Kempinski Hotel Muscat', loc: 'Al Mouj, Oman', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'PALACES, DESERTS & MOUNTAIN LODGES',
    venueTypesText: 'Muscat\'s architecture seamlessly blends traditional Omani aesthetics with modern high-luxury resort comfort.',
    venueTypesList: [
      { type: 'PALACE RESORTS', desc: 'Monumental luxury resorts with private bays, high-arched marble halls, and palm-fringed lawns.' },
      { type: 'DESERT RETREATS', desc: 'Exclusive luxury desert camps tucked among golden sand dunes, under pristine starlit skies.' },
      { type: 'MOUNTAIN LODGES', desc: 'Clifftop properties offering cool mountain air and panoramic canyon views.' }
    ],
    traditionsText: 'Gastronomy centers on slow-cooked Arabian spiced meats (shuwa), saffron-infused rice, fresh local catches, and sweet halwa served with cardamom coffee. Evening events feature traditional lute (oud) music, incense, and fire dancing.',
    gallery: [muscat1, muscat2, muscat3, muscat4, muscat5, muscat6, muscat7, muscat8]
  },
  'jaipur': {
    name: 'Jaipur',
    tagline: 'ROYAL HERITAGE PALACES & MAJESTIC FORTRESS CEREMONIES',
    heroImage: jaipur,
    intro: 'Experience the unmatched opulence of the Pink City. Jaipur features ancient heritage forts, hand-carved marble palace courtyards, and vibrant royal gardens. The ultimate dream for grand cultural weddings.',
    bestSeason: 'November to February (15°C - 25°C)',
    shoulderSeason: 'October & March (20°C - 30°C)',
    airports: 'JAI (Jaipur International Airport)',
    regions: 'Amer Fort Area, Kukas, Rambagh, Civil Lines',
    bullets: [
      'Grand heritage palace properties',
      'Intricate marble arches and columns',
      'Vibrant royal garden courtyards',
      'Extravagant festive wedding setups'
    ],
    venues: [
      { title: 'Rambagh Palace', loc: 'Jaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'City Palace Courtyards', loc: 'Old City, Jaipur', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Fairmont Jaipur', loc: 'Kukas, Jaipur', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Samode Palace', loc: 'Samode, Jaipur', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Leela Palace Jaipur', loc: 'Delhi Highway, Jaipur', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'PALACES, FORTS & GRAND COURTYARDS',
    venueTypesText: 'Jaipur represents the zenith of royal Indian heritage, where ancient palaces have been restored into ultra-luxury wedding sanctuaries.',
    venueTypesList: [
      { type: 'HERITAGE PALACES', desc: 'Magnificent former residences of kings, featuring massive courtyards, high-walled forts, and peacocks.' },
      { type: 'ROYAL GARDENS', desc: 'Lush green lawns bordered by stone fountains, marble pavilions, and historical colonnades.' },
      { type: 'BOUTIQUE HAVELIS', desc: 'Charming traditional mansions with hand-painted frescoes and intimate inner courtyards.' }
    ],
    traditionsText: 'Cuisine showcases the rich heritage of Rajasthani royalty, including Dal Baati Churma, royal thalis, and exotic desserts. Celebrations are highly festive, complete with elephant welcome processions, folk dance troupes, and dhol drummers.',
    gallery: [jaipur1, jaipur2, jaipur3, jaipur4, jaipur5, jaipur6, jaipur7]
  },
  'goa': {
    name: 'Goa',
    tagline: 'TROPICAL BEACHFRONT CEREMONIES & PORTUGUESE ESTATE VIBES',
    heroImage: goa,
    intro: 'For couples seeking a laid-back yet luxurious beachfront wedding. Goa combines serene golden sands, dramatic ocean sunsets, and stunning Portuguese-colonial heritage estates.',
    bestSeason: 'November to February (22°C - 30°C)',
    shoulderSeason: 'October & March (24°C - 32°C)',
    airports: 'GOI (Dabolim Airport), GOX (Mopa Airport)',
    regions: 'Candolim, Cavelossim Beach, Mandrem, Old Goa',
    bullets: [
      'Serene beachfront vow locations',
      'Stunning Portuguese-colonial estates',
      'Scenic ocean-view lawns',
      'Vibrant beach party receptions'
    ],
    venues: [
      { title: 'W Goa Resort', loc: 'Vagator Beach, Goa', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Leela Goa', loc: 'Cavelossim Beach, Goa', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
      { title: 'Taj Exotica Resort & Spa', loc: 'Benaulim, Goa', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Alila Diwa Goa', loc: 'Majorda, Goa', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Cidade de Goa', loc: 'Vainguinim Beach, Goa', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'BEACH RESORTS, CLIFFS & ESTATES',
    venueTypesText: 'Goa blends relaxed tropical beach vibes with rich colonial history, offering a unique set of coastal and heritage venues.',
    venueTypesList: [
      { type: 'BEACHFRONT RESORTS', desc: 'Luxury five-star properties with lawns that flow directly onto sandy beaches.' },
      { type: 'PORTUGUESE ESTATES', desc: 'Historic whitewashed mansions with tiled roofs, antique furniture, and lush gardens.' },
      { type: 'CLIFFSIDE RESORTS', desc: 'Venues positioned on high cliffs offering endless sea views and spectacular sunset stages.' }
    ],
    traditionsText: 'Cuisine features fresh seafood grills, Goan fish curry, fusion continental dining, and signature coconut cocktails. Parties are famous for live retro bands, sunset beach cocktail bars, and barefoot dancing on the sand.',
    gallery: [goa1, goa2, goa3, goa4, goa5, goa6]
  },
  'bali': {
    name: 'Bali',
    tagline: 'CLIFFSIDE TEMPLE SANCTUARIES & LUSH JUNGLE VOWS',
    heroImage: bali,
    intro: 'Immerse your vows in the spiritual elegance of Bali. With dramatic Uluwatu cliffside altars overlooking the Indian Ocean and deep jungle valleys in Ubud, Bali is a magical tropical sanctuary.',
    bestSeason: 'May to September (Dry season, 24°C - 30°C)',
    shoulderSeason: 'April & October (25°C - 31°C)',
    airports: 'DPS (Ngurah Rai International Airport)',
    regions: 'Uluwatu Cliffs, Ubud Jungle, Seminyak, Nusa Dua',
    bullets: [
      'Dramatic ocean-view clifftop altars',
      'Serene deep-jungle valley settings',
      'Elegant water-wedding platforms',
      'Spiritual, culturally rich atmosphere'
    ],
    venues: [
      { title: 'Alila Villas Uluwatu', loc: 'Uluwatu Cliffs, Bali', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'Amandari Resort', loc: 'Ubud Jungle, Bali', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
      { title: 'Ayana Resort & Spa', loc: 'Jimbaran, Bali', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Edge Bali', loc: 'Uluwatu, Bali', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Hanging Gardens of Bali', loc: 'Payangan Jungle, Bali', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'CLIFFTOPS, JUNGLES & SEA CHAPELS',
    venueTypesText: 'Bali offers some of the world\'s most scenic clifftop and jungle designs, prioritizing seamless integration with nature.',
    venueTypesList: [
      { type: 'CLIFFTOP VILLAS', desc: 'Exclusive private properties perched on vertical cliffs over the sea, featuring infinity pools.' },
      { type: 'JUNGLE RESORTS', desc: 'Eco-luxury retreats tucked inside deep green river valleys, surrounded by terraced rice fields.' },
      { type: 'OCEANFRONT CHAPELS', desc: 'Stunning glass and wood structures built right on the water\'s edge for seamless viewscapes.' }
    ],
    traditionsText: 'Cuisine includes Balinese suckling pig (babi guling), fresh ocean lobster, tropical fruits, and modern health-conscious culinary designs. Ceremonies are often accompanied by traditional gamelan music and fire dances.',
    gallery: [bali1, bali2, bali3, bali4, bali5, bali6]
  },
  'srilanka': {
    name: 'Srilanka',
    tagline: 'MISTY TEA COUNTRY SCENERY & EXOTIC OCEAN SHORES',
    heroImage: srilanka,
    intro: 'Sri Lanka presents an enchanting mix of lush colonial tea country highlands, ancient ruins, and serene coastal settings. Perfect for a secluded, high-end tropical celebration.',
    bestSeason: 'December to March for South Coast; May to September for East Coast (22°C - 30°C)',
    shoulderSeason: 'April & October (24°C - 31°C)',
    airports: 'CMB (Bandaranaike International Airport)',
    regions: 'Galle Fort, Weligama Cliff, Hatton Tea Country, Tangalle',
    bullets: [
      'Colonial-era tea country estates',
      'Lush beachside coconut groves',
      'Historic Galle Fort locations',
      'Scenic inland train transfers'
    ],
    venues: [
      { title: 'Cape Weligama Resort', loc: 'Weligama Cliff, Sri Lanka', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Ceylon Tea Trails Estates', loc: 'Hatton Highlands, Sri Lanka', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Anantara Peace Haven Tangalle', loc: 'Tangalle Coast, Sri Lanka', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Amangalla', loc: 'Galle Fort, Sri Lanka', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Fortress Resort & Spa', loc: 'Koggala, Sri Lanka', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'TEA ESTATES, FORTS & COASTAL HOTELS',
    venueTypesText: 'Sri Lanka\'s properties range from historic colonial-era bungalows nestled in tea hills to contemporary beachfront luxury resorts.',
    venueTypesList: [
      { type: 'TEA COUNTRY BUNGALOWS', desc: 'Misty mountain retreats with wood-burning fireplaces, wrap-around verandas, and tea plantation walks.' },
      { type: 'HISTORIC FORTS', desc: 'Charming stone-walled properties inside Galle Fort, offering a mix of history and luxury.' },
      { type: 'COASTAL RESORTS', desc: 'Modern oceanfront properties featuring wide palm lawns and private rocky coves.' }
    ],
    traditionsText: 'Cuisine focuses on aromatic curries, hopper tables, fresh crab, and tropical Ceylon tea pairings. Events feature traditional Kandyan drum processions (poruwa ceremonies) and vibrant island acoustic performances.',
    gallery: [srilanka1, srilanka2, srilanka3, srilanka4, srilanka5, srilanka6]
  },
  'andaman': {
    name: 'Andaman',
    tagline: 'SECLUDED TURQUOISE LAGOONS & PRIVATE ISLAND LUXURY',
    heroImage: andaman,
    intro: 'Undiscovered, exotic, and absolutely pristine. The Andaman Islands boast turquoise ocean lagoons, towering rainforests, and powdery beaches. A true luxury tropical paradise.',
    bestSeason: 'December to April (23°C - 29°C)',
    shoulderSeason: 'October & November (24°C - 30°C)',
    airports: 'IXZ (Veer Savarkar Airport, Port Blair)',
    regions: 'Havelock Island, Neil Island, Radhanagar Beach',
    bullets: [
      'Pristine turquoise water backdrops',
      'Secluded white-sand private beaches',
      'Towering ancient rainforest canopies',
      'Exclusive luxury island resorts'
    ],
    venues: [
      { title: 'Taj Exotica Resort & Spa', loc: 'Radhanagar Beach, Andaman', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Barefoot Scuba Resort', loc: 'Havelock Island, Andaman', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
      { title: 'Symphony Palms Beach Resort', loc: 'Havelock Island, Andaman', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Sea Shell Havelock', loc: 'Havelock Island, Andaman', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' },
      { title: 'Munjoh Ocean Resort', loc: 'Havelock Island, Andaman', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'ISLANDS, BEACHES & ECO-RETREATS',
    venueTypesText: 'Andaman\'s venues prioritize privacy and raw natural beauty, offering exclusive resort retreats surrounded by sea and forest.',
    venueTypesList: [
      { type: 'ISLAND RESORTS', desc: 'Eco-conscious luxury villas crafted from timber, hidden among palm trees steps from the beach.' },
      { type: 'PRIVATE BEACH COVES', desc: 'Secluded sandy spots perfect for intimate sunset dinners and barefoot vows.' },
      { type: 'FOREST ECO-LODGES', desc: 'Eco-lodges offering immersive rainforest sights and sounds alongside modern comfort.' }
    ],
    traditionsText: 'Cuisine features freshly caught seafood, tropical fruit-based cocktails, and fine grilled dining. Activities include snorkeling, diving excursions, beachside barbecues under bioluminescent waters, and live acoustic music.',
    gallery: [andaman1, andaman2, andaman3, andaman4, andaman5, andaman6]
  },
  'kerala': {
    name: 'Kerala',
    tagline: 'SERENE BACKWATER LAGOONS & MAJESTIC COCONUT GROVES',
    heroImage: kerala,
    intro: 'Kerala—God’s Own Country—presents an incredibly tranquil setting. Exchange vows on floating platforms, in colonial lakeside estates, or on pristine beaches bordered by endless palm forests.',
    bestSeason: 'September to March (22°C - 28°C)',
    shoulderSeason: 'April & August (24°C - 30°C)',
    airports: 'COK (Cochin Airport), TRV (Trivandrum Airport)',
    regions: 'Kumarakom, Alleppey Backwaters, Varkala Cliffs, Kovalam',
    bullets: [
      'Tranquil backwater floating altars',
      'Lush palm-fringed lakeside lawns',
      'Traditional luxury houseboats',
      'Ayurvedic-focused wellness resorts'
    ],
    venues: [
      { title: 'Kumarakom Lake Resort', loc: 'Kottayam, Kerala', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
      { title: 'The Raviz Ashtamudi', loc: 'Kollam, Kerala', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
      { title: 'Brunton Boatyard', loc: 'Fort Kochi, Kerala', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
      { title: 'Taj Green Cove Resort', loc: 'Kovalam Beach, Kerala', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80' },
      { title: 'Niraamaya Retreats Surya Samudra', loc: 'Kovalam Cliff, Kerala', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80' }
    ],
    venueTypes: 'LAKESIDES, HOUSEBOATS & PALM GROVES',
    venueTypesText: 'Kerala\'s venues focus on the serene backwaters, ancient wooden architecture, and verdant tropical gardens.',
    venueTypesList: [
      { type: 'LAKESIDE RESORTS', desc: 'Grand heritage properties situated on Lake Vembanad with open-air lawns and traditional architecture.' },
      { type: 'HOUSEBOAT VOWS', desc: 'Traditional kettuvallams converted into luxury floating platforms for intimate celebrations.' },
      { type: 'PALM GROVES', desc: 'Beachside lawns shaded by thousands of palm trees, offering cool shade and sea breezes.' }
    ],
    traditionsText: 'Cuisine highlights traditional Sadhya feasts served on banana leaves, coconut-spiced seafood, and local delicacies. Celebrations feature slow-paced sitar recitals, traditional Kathakali performers, and flower-bedecked boat entries for the couple.',
    gallery: [kerala1, kerala2, kerala3, kerala4, kerala5, kerala6, kerala7, kerala8]
  }
};

export default function Destination() {
  const { loc } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const locationParam = loc || searchParams.get('loc');

  const [activeLocation, setActiveLocation] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (locationParam) {
      // Map param to readable title
      const formatted = locationParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setActiveLocation(formatted);
    } else {
      setActiveLocation(null);
    }
  }, [locationParam]);

  const destinationsSliderRef = React.useRef(null);

  const scrollSlider = (direction) => {
    if (destinationsSliderRef.current) {
      const scrollAmount = destinationsSliderRef.current.clientWidth * 0.75;
      destinationsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Clean filters
  const handleClearFilter = () => {
    setSearchParams({});
    navigate('/destination');
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Get active profile for customized page layout
  const profile = locationParam ? DESTINATION_PROFILES[locationParam] : null;

  // Custom design render for specific destination page
  if (profile) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-24 text-neutral-900 font-body relative overflow-x-hidden">

        {/* Back and Action Toolbar */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 mb-8">
          <button
            onClick={handleClearFilter}
            className="flex items-center space-x-2 text-xs font-heading tracking-widest uppercase hover:text-brand-pink transition-colors font-semibold"
          >
            <ChevronLeft className="w-4 h-4 text-brand-pink" />
            <span>Back to Global Catalogue</span>
          </button>
        </section>

        {/* Top Asymmetrical Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Card: Editorial Text & Details */}
            <div className="lg:col-span-5 bg-white p-8 md:p-12 rounded-3xl shadow-xs border border-neutral-200/50 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold block">
                  Fine-Art Destination
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-wide uppercase leading-tight">
                  {profile.name}
                </h1>
                <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-medium">
                  {profile.tagline}
                </p>
                <div className="w-12 h-[1px] bg-brand-pink" />
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {profile.intro}
                </p>

                {/* Minimalist Quick Facts */}
                <div className="pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-heading tracking-wider uppercase text-neutral-400 block mb-1">
                      Best Season
                    </span>
                    <span className="text-xs text-neutral-800 font-medium uppercase tracking-wide">
                      {profile.bestSeason}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-heading tracking-wider uppercase text-neutral-400 block mb-1">
                      Regions
                    </span>
                    <span className="text-xs text-neutral-800 font-light leading-relaxed">
                      {profile.regions}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300 font-semibold shadow-sm text-center"
                >
                  Inquire for {profile.name}
                </button>
              </div>
            </div>

            {/* Showcase Image 1 (col-span-4) */}
            <div
              onClick={() => handleOpenLightbox(0)}
              className="lg:col-span-4 rounded-3xl overflow-hidden shadow-xs relative cursor-pointer group aspect-[3/4]"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10" />
              <img
                src={profile.gallery[0]}
                alt={`${profile.name} showcase 1`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-[9px] font-heading tracking-widest uppercase text-neutral-900">
                  <Camera className="w-3 h-3 text-brand-pink" /> View Fullscreen
                </span>
              </div>
            </div>

            {/* Showcase Image 2 (col-span-3) */}
            <div
              onClick={() => handleOpenLightbox(1)}
              className="lg:col-span-3 rounded-3xl overflow-hidden shadow-xs relative cursor-pointer group aspect-[3/4]"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10" />
              <img
                src={profile.gallery[1]}
                alt={`${profile.name} showcase 2`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-[9px] font-heading tracking-widest uppercase text-neutral-900">
                  <Camera className="w-3 h-3 text-brand-pink" /> View Fullscreen
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Section: Gallery Showcase Header & Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-neutral-200/50">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
              Complete Portfolio
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-wide text-neutral-900 uppercase">
              GALLERY SHOWCASE
            </h2>
            <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-2" />
          </div>

          {/* Grid Style Images (Responsive 3-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profile.gallery.slice(2).map((img, idx) => {
              const actualIndex = idx + 2;
              return (
                <div
                  key={actualIndex}
                  onClick={() => handleOpenLightbox(actualIndex)}
                  className="rounded-2xl overflow-hidden shadow-xs relative cursor-pointer group aspect-[3/4] border border-neutral-200/20"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 z-10" />
                  <img
                    src={img}
                    alt={`${profile.name} gallery image ${actualIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs rounded-full px-5 py-2.5 text-[9px] font-heading tracking-widest uppercase text-neutral-900 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-brand-pink" /> View Story
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lightbox for Destination Profile Gallery */}
        <GalleryLightbox
          isOpen={lightboxOpen}
          images={profile.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          setCurrentIndex={setLightboxIndex}
        />

        <Footer />
      </div>
    );
  }

  // Global Catalogue layout (when no specific loc parameter is active)
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-body">

      {/* ── HERO BANNER with Breadcrumb ── */}
      <section className="relative h-[320px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
          alt="Destination Weddings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-6 space-y-4">
          <h1 className="font-heading text-4xl md:text-6xl font-light text-white tracking-[0.25em] uppercase leading-none">
            Destinations
          </h1>
          {/* Breadcrumb trail */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-heading tracking-[0.22em] uppercase">
            <button onClick={() => navigate('/')} className="text-[#e9a2a2] hover:text-white transition-colors">Home</button>
            <span className="text-[#e9a2a2] opacity-70">/</span>
            <span className="text-[#e9a2a2]">Destination</span>
          </div>
          <div className="w-6 h-6 border border-[#e9a2a2]/50 rounded-full mx-auto mt-2" />
        </div>
      </section>

      {/* Active filter notice */}
      {activeLocation && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
          <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Active Filter</span>
              <p className="font-heading text-2xl font-light text-neutral-900 tracking-wide mt-1">Weddings in {activeLocation}</p>
            </div>
            <button
              onClick={handleClearFilter}
              className="px-6 py-3 border border-neutral-300 hover:border-brand-pink hover:text-brand-pink rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* ── SECTION 1: Popular Destinations Grid ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Fine-Art Locations</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-neutral-900 uppercase">Popular Wedding Destinations</h2>
          <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
          <p className="text-sm text-neutral-500 font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Handpicked destinations where every backdrop tells a love story. From tropical cliffs to royal palaces.
          </p>
        </div>

        {/* Masonry-style destination grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((dest, idx) => {
            const slug = dest.name.toLowerCase().replace(/\s+/g, '-');
            const isFeatured = idx === 0 || idx === 4; // Make 2 cards taller
            return (
              <div
                key={idx}
                onClick={() => navigate(`/destination/${slug}`)}
                className={`group relative overflow-hidden cursor-pointer rounded-2xl shadow-sm border border-neutral-200/60 hover:shadow-lg hover:border-brand-pink/30 transition-all duration-500 ${isFeatured ? 'sm:row-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden w-full ${isFeatured ? 'aspect-[3/5] sm:h-full' : 'aspect-[3/4]'}`}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-brand-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <p className="text-[9px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold mb-1">
                      {dest.desc}
                    </p>
                    <h3 className="font-heading text-xl font-light tracking-[0.15em] uppercase leading-tight">
                      {dest.name}
                    </h3>
                    {/* Arrow on hover */}
                    <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-[9px] font-heading tracking-[0.25em] uppercase text-white/90">Explore</span>
                      <ArrowRight className="w-3 h-3 text-brand-pink" />
                    </div>
                  </div>

                  {/* Top badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[9px] font-heading tracking-widest uppercase text-white">
                      <MapPin className="w-2.5 h-2.5 text-brand-pink" />
                      {dest.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 2: Marquee / Stats Band ── */}
      <section className="bg-neutral-900 py-10 overflow-hidden">
        <div className="flex items-center gap-14 animate-marquee-slow whitespace-nowrap px-12">
          {['International Weddings', 'Fine-Art Photography', 'Destination Films', 'Curated Venues', 'Luxury Experiences', 'Bespoke Packages'].map((label, i) => (
            <span key={i} className="flex items-center gap-4 text-[11px] font-heading tracking-[0.3em] uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />
              {label}
            </span>
          ))}
          {/* Duplicate for infinite loop */}
          {['International Weddings', 'Fine-Art Photography', 'Destination Films', 'Curated Venues', 'Luxury Experiences', 'Bespoke Packages'].map((label, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-4 text-[11px] font-heading tracking-[0.3em] uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Why Choose a Destination Wedding ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: editorial image stack */}
          <div className="relative">
            <div className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                alt="Destination wedding couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating accent image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-60 rounded-xl overflow-hidden border-4 border-[#FAF8F5] shadow-xl z-20">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
                alt="Wedding detail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative border frame */}
            <div className="absolute -inset-4 border border-brand-pink/20 rounded-2xl pointer-events-none z-0" />
          </div>

          {/* Right: text content */}
          <div className="space-y-8 lg:pl-8">
            <div className="space-y-3">
              <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Bespoke Catalogue</span>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-neutral-900 tracking-wide leading-tight">
                WELCOME TO<br />
                <span className="font-semibold">MARRY THE WORLD</span>
              </h2>
              <div className="w-10 h-[1px] bg-brand-pink" />
            </div>

            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              Our handpicked wedding venues span the continents, bringing you a diverse array of settings from all corners of the globe. We believe that every love story is unique, and that each couple deserves a venue that perfectly reflects their dreams.
            </p>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              Whether you've always envisioned your day in a romantic European castle, surrounded by lush vineyards, or beneath the palms on a secluded island paradise — our curated catalogue brings together the world's most extraordinary venues.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-200">
              {[['200+', 'Destinations'], ['11+', 'Countries'], ['500+', 'Weddings']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-heading text-2xl font-light text-brand-pink">{num}</p>
                  <p className="text-[9px] font-heading tracking-[0.2em] uppercase text-neutral-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm"
            >
              Begin Your Journey <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Real Weddings Inspiration ── */}
      <section className="bg-white py-24 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Love Stories</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-neutral-900 uppercase">Get Inspired by Real Weddings</h2>
            <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REAL_WEDDINGS.map((wedding, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col space-y-4">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-sm border border-neutral-100">
                  <img
                    src={wedding.image}
                    alt={wedding.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  {/* Hover overlay label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 text-[10px] font-heading tracking-widest uppercase text-neutral-900">
                      <Eye className="w-3.5 h-3.5 text-brand-pink" /> View Story
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 px-1">
                  <span className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                    {wedding.location}
                  </span>
                  <h3 className="font-heading text-sm font-light tracking-wide text-neutral-900 group-hover:text-brand-pink transition-colors leading-snug">
                    {wedding.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/galleries')}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-neutral-300 hover:border-brand-pink hover:text-brand-pink rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold"
            >
              View All Galleries <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA Banner ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt="Wedding background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 space-y-6">
          <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Start Your Journey</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-white tracking-wide uppercase leading-tight">
            Your Dream Wedding<br />Awaits Around The World
          </h2>
          <p className="text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Let us craft an extraordinary destination wedding experience tailored precisely to your vision, wherever in the world you wish to celebrate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm"
            >
              Inquire Now
            </button>
            <button
              onClick={() => navigate('/galleries')}
              className="px-8 py-4 border border-white/40 hover:border-white text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
