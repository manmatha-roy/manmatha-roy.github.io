/*
  Edit summary text here. The keys match data-key in research.html.
  These are starter descriptions based on the supplied titles, not verified
  abstracts. Review or replace them with your own summaries before publishing.
  Use a blank string to omit a summary button. Separate paragraphs with a blank line.
  Keep links in links.js and all visual styles in style.css.
*/
const SUMMARIES = {
  "nonlinearity-estimation": "How far is a Boolean function from a simple affine rule? This work studies the problem of estimating that distance, a measure known as nonlinearity.",
  "sumset-size": "If we add every pair of elements from a set, how many distinct sums do we obtain? This work studies estimating that number by organizing the set into dense pieces within cosets.",
  "near-optimal-testing": "Can we tell whether a function has a short Fourier representation without examining all its values? This work studies how to test Fourier sparsity while keeping the number of queries small.",
  "exact-recovery": "A Fourier-sparse function can be described by a small collection of coefficients. This work studies how to recover that representation exactly from observations of the function.",
  "arithmetic-regularity": "Complicated objects can become easier to understand when organized into structured pieces. This work studies constructive arithmetic regularity for Abelian groups, where the group operation is commutative.",
  "distribution-free": "In practice, samples need not be uniformly distributed. This work studies testing whether a function has a sparse Fourier representation in the distribution-free setting.",
  "spectral-shadows": "How much information must two parties exchange to test a relationship between functions? This work connects communication complexity with testing properties that remain unchanged under linear transformations.",
  "implicit-sensing": "A function may have a simple Fourier representation even when its full description is very large. This work studies testing for that sparsity through implicit sensing, using queries to access information about the function.",
  "economical-sieve": "This work brings together spectral norm, filtering significant Fourier components, and testing Boolean-function properties that are preserved by linear transformations. Its focus is on finding useful structure with limited access to a function.",
  "price-of-parsimony": "A sparse Fourier representation uses only a few components. This work studies the complexity of checking whether such a compact representation exists, and the resources needed for Fourier sparsity testing.",
  "iso-abelian": "Two Boolean functions can describe the same pattern after the underlying group elements are relabeled by an automorphism. This work studies testing that form of equivalence over Abelian groups.",
  "maiorana-mcfarland": "Boolean functions used in cryptography need both suitable mathematical properties and practical implementations. This work studies constructions of the Maiorana–McFarland type with those implementation considerations in mind.",
  "bent-balanced": "Bent functions have strong nonlinearity, but their outputs are not balanced. This work studies modifying them to obtain equal numbers of zeros and ones while retaining high nonlinearity.",
  "sbox-spectra": "S-boxes are small substitution components used in cryptographic systems. This work experimentally examines higher-order differential spectra of invertible 6-bit and 8-bit S-boxes, looking at how structured input changes affect their outputs."
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
    button.textContent = 'Show summary';
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
      button.textContent = expand ? 'Hide summary' : 'Show summary';
    });

    links.appendChild(button);
    body.appendChild(panel);
  });
})();
