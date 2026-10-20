import './KraftScrapbook.css';
import PencilCard from './PencilCard';

export default function KraftScrapbook() {
  return (
    <div className="ks-desk-card" data-purpose="kraft-scrapbook">
      <div className="ks-kraft">
        <div className="ks-texture" />
        <div className="ks-tape ks-tape-header" />

        <div className="ks-grid">
          {/* Frost bloom */}
          <div className="ks-polaroid ks-tilt-left">
            <div className="ks-photo">
              <svg className="ks-svg-fill" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="frostGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                </defs>
                <rect fill="url(#frostGrad)" height="100" width="100" />
                <circle cx="35" cy="45" fill="#f8fafc" opacity="0.8" r="14" />
                <circle cx="65" cy="55" fill="#e2e8f0" opacity="0.9" r="18" />
              </svg>
            </div>
            <p className="font-synt ks-caption">Potato</p>
          </div>

          {/* Spring field */}
          <div className="ks-polaroid ks-tilt-right">
            <div className="ks-tape ks-tape-meadow" />
            <div className="ks-photo ks-photo-meadow">
              <svg className="ks-svg-fill" viewBox="0 0 100 100">
                <rect fill="#dcfce7" height="100" width="100" />
                <circle cx="50" cy="80" fill="#86efac" r="40" />
                <circle cx="30" cy="40" fill="#f43f5e" r="8" />
                <circle cx="70" cy="35" fill="#fbbf24" r="10" />
              </svg>
            </div>
            <p className="font-synt ks-caption">Your photo</p>
          </div>

          <div className="ks-row">
            {/* Mochi */}
            <div className="ks-cat-card">
              <div className="ks-tape ks-tape-cat" />
              <div className="ks-cat-photo">
                <svg className="ks-cat-svg" viewBox="0 0 100 100">
                  <ellipse cx="50" cy="65" fill="#f59e0b" rx="24" ry="20" />
                  <polygon fill="#d97706" points="35,35 45,52 30,50" />
                  <polygon fill="#d97706" points="65,35 70,50 55,52" />
                  <circle cx="50" cy="48" fill="#fbbf24" r="17" />
                  <circle cx="44" cy="46" fill="#1f2937" r="2" />
                  <circle cx="56" cy="46" fill="#1f2937" r="2" />
                  <polygon fill="#f43f5e" points="50,51 48,49 52,49" />
                  <line stroke="#374151" strokeWidth="1" x1="38" x2="44" y1="52" y2="51" />
                  <line stroke="#374151" strokeWidth="1" x1="62" x2="56" y1="52" y2="51" />
                </svg>
              </div>
              <p className="font-synt ks-caption">My photo 🐾</p>
            </div>

            <div className="ks-side">
              <div className="ks-golden-hour">
                <div className="ks-golden-icon">🌻</div>
                <span className="font-synt ks-golden-text">For me</span>
              </div>
              <div className="ks-leaf-wrap">
                <svg className="ks-leaf" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="ks-footer">
         <p className="font-suo tracking-wider text-xl sm:text-2xl ks-headline">capture moments</p>
        </div>
      </div>
      <PencilCard
        href=""
        fluid
        text="capture moments"
        className="relative z-40 -mt-4 ml-[8%] w-[84%]"
      />

 
    </div>
  );
}
