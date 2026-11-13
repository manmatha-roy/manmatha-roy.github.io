/*
  Research summaries based on the supplied abstracts.
  The keys match data-key in research.html.
  Use a blank string to omit a summary button. Separate paragraphs with a blank line.
  Keep links in links.js and all visual styles in style.css.
*/
const SUMMARIES = {
  "nonlinearity-estimation": "The nonlinearity of a Boolean function measures its distance from the nearest affine Boolean function and is determined by its largest absolute Fourier coefficient. We estimate this coefficient to additive error τ using Õ(1/τ²) oracle queries, independently of the number of variables. An Ω(1/τ²) lower bound establishes optimality up to logarithmic factors. We also give an application to cube testing.",

  "sumset-size": "We prove a structural decomposition for sets whose indicator functions have bounded Fourier spectral norm. The decomposition approximates a set using dense subsets of cosets of a low-codimension subspace, with polynomial dependence on the inverse error and nearly linear dependence on the spectral norm. A constructive version gives a polynomial-query algorithm for sumset-size estimation.",

  "near-optimal-testing": "A Boolean function is s-Fourier sparse if its Fourier expansion has at most s nonzero coefficients. We distinguish such functions from those that disagree with every s-Fourier-sparse Boolean function on at least an ε fraction of inputs. Our tester uses Õ(s/ε + 1/ε²) nonadaptive queries, independently of the number of variables. For constant ε, this matches the Ω(s) lower bound up to logarithmic factors.",

  "exact-recovery": "Given oracle access to a real-valued function on the n-dimensional Boolean hypercube with at most k nonzero Fourier coefficients, we recover the locations and values of all these coefficients. Our randomized algorithm uses O(nk) queries and O(nk log k) time. The query complexity is optimal up to constant factors.",

  "arithmetic-regularity": "We give a constructive version of Green's arithmetic regularity lemma for finite Abelian groups of constant exponent. Given membership-query access to a set, the algorithm constructs an implicit regular decomposition. Its time and query complexity are independent of the group size and polynomial in the regularity parameters and the associated tower bound. Applications include removing linear configurations and approximately counting systems of Cauchy–Schwarz complexity one.",

  "distribution-free": "We study Fourier sparsity testing for real-valued functions when distance is measured under an arbitrary unknown input distribution D. Given oracle access to the function and independent samples from D, our nonadaptive randomized tester distinguishes s-Fourier-sparse functions from those δ-far from every such function. It uses Õ((s/δ)⁴) oracle queries and Õ(1/δ) samples from D.",

  "spectral-shadows": "Alice and Bob each receive a Boolean function and must distinguish linear isomorphism from being far from linearly isomorphic. We study the number of bits they must exchange to solve this problem. Our protocols and lower bounds relate this communication cost to approximate Fourier spectral norm. Private randomness gives a quadratic improvement in the dependence on this parameter over deterministic communication.",

  "implicit-sensing": "We give a tester that distinguishes Boolean functions with at most s nonzero Fourier coefficients from functions that are far from every such Boolean function. For constant distance parameter, it uses Õ(s⁴) queries, independently of the number of variables. The algorithm combines refined sampling with compressed sensing. We also prove an Ω(s) query lower bound through a reduction from communication complexity.",

  "economical-sieve": "Given a known Boolean function g and oracle access to f, we test whether an invertible linear transformation makes them ε-close or whether every such transformation leaves them at least ε + ω apart in normalized Hamming distance. The tester uses Õ((m/ω)⁴) nonadaptive queries, where m bounds the Fourier spectral norm of g. We prove an Ω(m²) lower bound for constant gap. The algorithm uses a query-efficient local list corrector for Hadamard codes.",

  "price-of-parsimony": "For a real-valued function f with normalized squared ℓ₂-norm equal to one, we estimate its squared ℓ₂-distance from the nearest function with at most s nonzero Fourier coefficients. The estimator achieves additive error ε using Õ(s/ε²) nonadaptive queries, independently of the number of variables. The analysis uses spectral concentration under random affine restrictions. An Ω(s) lower bound establishes near-optimal dependence on sparsity for constant accuracy.",

  "iso-abelian": "Let f and g be Boolean functions on a finite Abelian group of constant exponent, with g fully known and f accessible through queries. We distinguish whether f becomes ε-close to g under some group automorphism or remains at least ε + τ away under every automorphism. Distance is normalized Hamming distance. The tester uses poly(s, 1/τ) queries, where s bounds the Fourier spectral norm of g.",

  "maiorana-mcfarland": "We construct a variant of the Maiorana–McFarland family whose Boolean functions are balanced, have high nonlinearity and algebraic degree, and have low maximum absolute autocorrelation over nonzero shifts. We also analyze their implementation using circuits with gates of fan-in at most two. The construction addresses both cryptographic parameters and circuit size.",

  "bent-balanced": "We analyze how modifications of bent functions affect Hamming weight, nonlinearity, and the Walsh–Hadamard spectrum. This gives a combinatorial framework for constructing balanced Boolean functions with high nonlinearity and unifies several earlier constructions. We provide examples on 8, 10, 12, and 14 variables and examine their relevance to Dobbertin's conjecture.",

  "sbox-spectra": "We experimentally study higher-order differential spectra of multiplicative-inverse S-boxes and an APN permutation. The APN example exhibits larger second-order differential bias than the inverse-based examples considered. These results distinguish first-order differential optimality from higher-order differential behavior and motivate further analysis of possible cryptographic consequences."
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
