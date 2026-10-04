/*
  Research summaries based on the supplied abstracts.
  The keys match data-key in research.html.
  Use a blank string to omit a summary button. Separate paragraphs with a blank line.
  Keep links in links.js and all visual styles in style.css.
*/
const SUMMARIES = {
  "nonlinearity-estimation": "We estimate the largest Fourier coefficient in magnitude of a Boolean function to additive error ±τ using Õ(1/τ²) oracle queries. A matching Ω(1/τ²) lower bound establishes optimality up to polylogarithmic factors, with an application to cube testing.",
  "sumset-size": "We approximate sets of bounded Fourier spectral norm by unions of dense cosets with low codimension, achieving polynomial dependence on the inverse error and nearly linear dependence on the norm. A constructive version gives a polynomial-query algorithm for estimating sumset size.",
  "near-optimal-testing": "We test whether a Boolean function is s-Fourier sparse or ε-far from every such function using Õ(s/ε + 1/ε²) nonadaptive queries. For fixed ε, this is nearly linear in s and matches the Ω(s) lower bound up to polylogarithmic factors.",
  "exact-recovery": "A simple randomized algorithm exactly recovers all nonzero Fourier coefficients of a k-sparse function on the Boolean hypercube. It uses O(nk) oracle queries and O(nk log k) time, attaining optimal query complexity up to constant factors.",
  "arithmetic-regularity": "We construct Green’s arithmetic regularity decomposition for finite Abelian groups of constant torsion using oracle access. Time and query bounds are polynomial in the regularity parameters and tower bound, independent of group size, with applications to configuration removal and counting systems of Cauchy–Schwarz complexity one.",
  "distribution-free": "We initiate distribution-free testing of Fourier sparsity for real-valued functions, measuring distance under an arbitrary unknown input distribution. Our nonadaptive randomized tester distinguishes s-sparse functions from those δ-far from every such function using Õ((s/δ)⁴) oracle queries and Õ(1/δ) samples.",
  "spectral-shadows": "We study how much Alice and Bob must communicate to decide whether two Boolean functions are linearly isomorphic or far from equivalent. Protocols and lower bounds identify approximate spectral norm as the key complexity measure, with private randomness improving the deterministic dependence quadratically.",
  "implicit-sensing": "We give a dimension-independent tester for Boolean Fourier sparsity using Õ(s⁴) queries and prove an Ω(s) lower bound. The upper bound combines refined sampling with compressed sensing, while the lower bound follows from communication complexity.",
  "economical-sieve": "We test tolerant linear isomorphism using Õ((m/ω)⁴) queries, with an Ω(m) lower bound, where m bounds the spectral norm and ω is the tolerance gap. The method uses local list correction of Hadamard codes and supports oracle access to both functions.",
  "price-of-parsimony": "We estimate a real-valued function’s squared ℓ₂-distance to the nearest s-Fourier-sparse function, with query complexity nearly linear in s and optimal 1/ε² dependence. Spectral concentration under random affine restrictions gives dimension-independent bounds with only logarithmic dependence on the eighth moment.",
  "iso-abelian": "Given query access to f and a fully known reference g on a finite Abelian group, we test whether the functions are close under some automorphism or far under every automorphism. The tester uses poly(s, 1/τ) queries, where s bounds g’s spectral norm and τ is the tolerance gap.",
  "maiorana-mcfarland": "We develop a Maiorana–McFarland variant that produces balanced Boolean functions with high nonlinearity, low absolute autocorrelation and high algebraic degree. The construction emphasizes implementation with few gates of fan-in at most two, connecting cryptographic quality with circuit efficiency.",
  "bent-balanced": "We develop a combinatorial framework connecting weight, nonlinearity and Walsh–Hadamard spectra to study highly nonlinear balanced Boolean functions. It unifies earlier constructions based on modifying bent functions and provides examples on 8, 10, 12 and 14 variables, informing the study of Dobbertin’s conjecture.",
  "sbox-spectra": "We experimentally compare higher-order differential spectra of multiplicative inverse S-boxes and an APN permutation. The observed larger second-order bias of the APN example motivates further investigation of higher-order differential attacks."
};

(function () {
  document.querySelectorAll('.pub-entry[data-key]').forEach(function (entry) {
    const key = entry.getAttribute('data-key');
    const text = SUMMARIES[key];
    const body = entry.querySelector('.pub-body');
    const meta = entry.querySelector('.pub-meta');
    if (typeof text !== 'string' || !text.trim() || !body || !meta) return;
    if (entry.querySelector('.pub-summary-toggle')) return;

    let links = meta.querySelector('.pub-links');
    if (!links) {
      links = document.createElement('span');
      links.className = 'pub-links';
      meta.appendChild(links);
    }

    const button = document.createElement('button');
    const panel = document.createElement('div');
    const panelId = 'summary-' + key;
    button.type = 'button';
    button.className = 'pub-summary-toggle';
    button.id = panelId + '-toggle';
    button.textContent = 'summary';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', panelId);

    panel.id = panelId;
    panel.className = 'pub-summary-panel';
    panel.hidden = true;
    text.trim().split(/\n\s*\n/).forEach(function (paragraph) {
      const p = document.createElement('p');
      p.textContent = paragraph.trim();
      panel.appendChild(p);
    });

    button.addEventListener('click', function () {
      const expand = button.getAttribute('aria-expanded') !== 'true';
      panel.hidden = !expand;
      button.setAttribute('aria-expanded', String(expand));
    });

    links.appendChild(button);
    body.appendChild(panel);
  });
})();
