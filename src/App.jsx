import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [productsData, setProductsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Perfumes');
  const [activeSub, setActiveSub] = useState('All');

  useEffect(() => {
    fetch('/Products.json') 
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  const filteredProducts = productsData.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeCategory === 'Perfumes' && activeSub !== 'All' && p.subCategory !== activeSub) return false;
    return true;
  });

  const colors = { bg: '#F9F6F0', purple: '#621C4F', gold: '#D4AF37' };

  return (
    <div className="min-h-screen font-playfair antialiased selection:bg-[#4A2545] selection:text-white" style={{ backgroundColor: colors.bg, color: colors.purple }}>
      
      <header className="flex flex-col items-center pt-8 md:pt-12 pb-6 px-4 text-center">
        <img src="/images/logo.png" alt="Zagel Logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-2" />
        <p className="text-xs sm:text-sm md:text-base mt-2 tracking-widest logoMassage font-marhey font-bold px-2" style={{ color: colors.gold }}>
          رسالة كلّ ريحة حلوة
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8 mb-6 px-4 max-w-xl mx-auto">
        {['Perfumes', 'Body Mist', 'Reed Diffusers', 'Bundles'].map(cat => (
          <button 
            key={cat}
            onClick={() => { setActiveCategory(cat); setActiveSub('All'); }}
            className={`text-xs sm:text-sm md:text-lg font-medium transition-all pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === cat ? 'border-[#4A2545] font-semibold' : 'border-transparent text-gray-400 hover:text-[#4A2545]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {activeCategory === 'Perfumes' && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-4 max-w-md mx-auto">
          {['All', 'Women', 'Men', 'Unisex'].map(sub => (
            <button 
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs md:text-sm transition-all whitespace-nowrap ${
                activeSub === sub ? 'bg-[#4A2545] text-white' : 'border border-[#4A2545] text-[#4A2545] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group relative">
              
              <div>
                {/* Product Image Container with Out of Stock overlay */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-50 rounded-t-xl group">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-500 ${product.outOfStock ? 'opacity-60 grayscale-[20%]' : 'group-hover:scale-105'}`} 
                  />
                  {/* Out of Stock Overlay */}
                  {product.outOfStock && (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10 flex items-center justify-center">
                      <span className="bg-white/95 text-[#4A2545] px-4 py-1.5 font-bold rounded-full text-[10px] sm:text-xs md:text-sm shadow-md border border-[#D4AF37]">
                        في طريقهِ إليكم مجددًا
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 line-clamp-1 font-playfair">{product.name}</h3>
                  <p className="text-[8px] sm:text-xs font-marhey mt-2 text-gray-500 line-clamp-2" >{product.ingradients}</p>
                  <span className="text-[8px] sm:text-xs font-marhey inline-block mt-1" style={{color: colors.gold}}>{product.cat}</span>
                </div>
              </div>

              {/* Pricing & Sizes Container */}
              <div className="p-3 sm:p-4 pt-0 text-center">
                <div className="flex flex-col gap-1 border-t pt-2 sm:pt-3">
                  {product.sizes && product.sizes.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center px-1 py-0.5 border-b border-dashed text-[10px] sm:text-xs last:border-0 border-gray-100">
                      <span className="font-semibold text-gray-500">{s.size}</span>
                      
                      {/* Price Display Logic (Handling Bundles/Discounts) */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {s.oldPrice && (
                          <span className="line-through text-gray-400 text-[9px] sm:text-[13px]">
                            {s.oldPrice}
                          </span>
                        )}
                        <span className="font-bold text-[#4A2545]">{s.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-16 font-amiri text-lg">عبق فريد في طريقه إليكم.. انتظرونا</p>
        )}
      </div>

      <a href="https://wa.me/+201036596566?text=Hello%20I%20am%20interested%20in%20your%20products" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#25D366] text-white p-2.5 sm:p-3 rounded-full shadow-lg z-50 hover:scale-110 transition-transform active:scale-95">
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>

    </div>
  );
}