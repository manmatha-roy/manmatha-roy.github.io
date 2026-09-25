/* ------------------------------------------------------------------
   links.js — the ONE place to edit links.

   Two lists below:
     PEOPLE  : collaborator name  ->  where their name should link
     PAPERS  : paper key          ->  arXiv / ePrint / DOI / slides / ...

   Nothing else needs touching. Leave a value as "" and that link simply
   does not appear. The page works fine even if this file is missing.
   ------------------------------------------------------------------ */


/* ---------- 1. Collaborators ---------------------------------------

   Every time one of these names appears in an author line, it becomes a
   link. Right now most point at a DBLP search, which always works.
   Replace any of them with the person's own homepage when you have it —
   just swap the URL, nothing else.                                   */

const PEOPLE = {
  "Subhamoy Maitra":          "https://www.isical.ac.in/~subho/",
  "Arijit Ghosh":             "https://sites.google.com/site/homepagearijitghosh/",
  "Swarnalipa Dutta":         "https://scholar.google.com/citations?user=KWfaL7YAAAAJ&hl=en",
  "Chandrima Kayal":          "https://sites.google.com/view/chandrimakayal/home",
  "Manaswi Paraashar":        "https://sites.google.com/view/manaswi-paraashar/home",
  "Sourav Chakraborty":       "https://dblp.org/search?q=Sourav+Chakraborty",
  "Bimal Mandal":             "https://scholar.google.com/citations?user=LTOTMj0AAAAJ&hl=en",
  "Deng Tang":                "https://scholar.google.com/citations?user=Fhn_DMsAAAAJ&hl=en",
  "Anupam Chattopadhyay":     "https://scholar.google.com/citations?user=TIt4ggwAAAAJ&hl=en",
  "Nikolay Stoyanov Kaleyski":"https://scholar.google.com/citations?user=YkieG_AAAAAJ&hl=en",
};


/* ---------- 2. Papers ----------------------------------------------

   The key on the left matches the data-key="..." on each paper in
   research.html. Fill in whichever URLs you have — blank ones are
   skipped, so a paper with nothing filled in shows no link row.

   Paste a DBLP record link (dblp.org/rec/...), an arXiv abs page, a
   DOI, a PDF in assets/ — whatever you have. The key name is what
   appears on the button, so you can invent your own (code, poster,
   talk, video).                                                      */

const PAPERS = {

  /* --- manuscripts ---
     Nothing is indexed yet, so these stay blank until you post a
     preprint. Fill in arXiv / ePrint / pdf and the link row appears. */
  "nonlinearity-estimation": { arXiv: "", ePrint: "", pdf: "" },
  "sumset-size":             { arXiv: "", ePrint: "", pdf: "" },
  "near-optimal-testing":    { arXiv: "", ePrint: "", pdf: "" },
  "exact-recovery":          { arXiv: "", ePrint: "", pdf: "" },
  "arithmetic-regularity":   { arXiv: "", ePrint: "", pdf: "" },

  /* --- published --- */
  "distribution-free":{ link: "https://openreview.net/forum?id=Yptam5J8AE#discussion", arXiv: "", slides: "", video: "" },
  "spectral-shadows": { link: "", arXiv: "", slides: "", video: "" },
  "implicit-sensing": { link: "https://proceedings.iclr.cc/paper_files/paper/2026/hash/634cb3ace86e0908a721865a73f2e36e-Abstract-Conference.html", arXiv: "", slides: "", poster: "" },

  "economical-sieve": { link: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2026.30",
                         arXiv: "", slides: "", video: "" },

  "price-of-parsimony": { link: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/f17376c941d5882050e2e366bb74dffa-Abstract-Conference.html",
                           arXiv: "", slides: "", poster: "" },
  "iso-abelian":        { link: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.APPROX/RANDOM.2025.66",
                           arXiv: "", slides: "" },
  "maiorana-mcfarland": { link: "https://cic.iacr.org/p/2/2/15",
                           ePrint: "" },

  "differential-uniformity": { link: "", ePrint: "", slides: "" },

  "bent-balanced":  { link: "https://link.springer.com/chapter/10.1007/978-3-031-22912-1_20",
                       ePrint: "" },
  "sbox-spectra":   { link: "https://link.springer.com/chapter/10.1007/978-3-030-66626-2_9",
                       ePrint: "" },
};


/* ==================================================================
   Below this line is the machinery. You should not need to edit it.
   ================================================================== */

(function () {

  /* --- link the collaborator names --------------------------------- */

  // longest names first, so "Arijit Ghosh" wins over a shorter overlap
  const names = Object.keys(PEOPLE)
    .filter(n => PEOPLE[n])
    .sort((a, b) => b.length - a.length);

  if (names.length) {
    const pattern = new RegExp(
      "(" + names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
      "g"
    );

    document.querySelectorAll(".pub-authors").forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        if (!pattern.test(node.nodeValue)) return;
        pattern.lastIndex = 0;

        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = pattern.exec(node.nodeValue)) !== null) {
          frag.appendChild(
            document.createTextNode(node.nodeValue.slice(last, m.index))
          );
          const a = document.createElement("a");
          a.href = PEOPLE[m[1]];
          a.textContent = m[1];
          a.className = "author-link";
          frag.appendChild(a);
          last = m.index + m[1].length;
        }
        frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  /* --- number the entries ------------------------------------------- */
  /* One continuous sequence over manuscripts and publications. The
     oldest entry (bottom of the page) is 1, counting upwards, so the
     newest work carries the highest number. Add or remove a paper and
     the numbering fixes itself.                                        */

  const entries = Array.from(document.querySelectorAll("ol.pubs > li"));
  const total = entries.length;
  entries.forEach((li, i) => li.setAttribute("data-num", total - i));

  /* Older versions of style.css numbered each list with its own CSS
     counter, which restarted at every year. This overrides that, so the
     numbering below is correct whichever style.css is live.           */
  const numberingCSS = document.createElement("style");
  numberingCSS.textContent =
    "ol.pubs { counter-reset: none !important; }" +
    "ol.pubs > li::before {" +
    "  content: attr(data-num) !important;" +
    "  counter-increment: none !important;" +
    "  position: absolute; left: 0; top: 2px;" +
    "  width: 24px; text-align: right;" +
    "  font-variant-numeric: tabular-nums; font-size: 13px;" +
    "}";
  document.head.appendChild(numberingCSS);

  /* --- add the link row under each paper ---------------------------- */

  document.querySelectorAll("[data-key]").forEach(li => {
    const spec = PAPERS[li.getAttribute("data-key")];
    if (!spec) return;

    const filled = Object.keys(spec).filter(k => spec[k]);
    if (!filled.length) return;

    /* The venue name becomes the link to the paper. Whichever of these
       is filled in first wins; the rest trail after it as small pills. */
    const ORDER = ["link", "DOI", "doi", "OpenReview", "arXiv", "ePrint", "pdf", "PDF"];
    let primary = ORDER.find(k => spec[k]) || filled[0];

    const venue = li.querySelector(".pub-venue");
    if (venue && !venue.closest("a")) {
      const a = document.createElement("a");
      a.href = spec[primary];
      a.className = "pub-venue";
      a.textContent = venue.textContent;
      venue.replaceWith(a);
    } else {
      primary = null;            // nothing to attach the link to
    }

    const LABELS = { pdf: "PDF", doi: "DOI", eprint: "ePrint", arxiv: "arXiv", link: "paper" };

    const rest = filled.filter(k => k !== primary);
    if (!rest.length) return;

    const row = document.createElement("span");
    row.className = "pub-links";
    rest.forEach(key => {
      const a = document.createElement("a");
      a.href = spec[key];
      a.textContent = LABELS[key.toLowerCase()] || key;
      row.appendChild(a);
    });

    (li.querySelector(".pub-meta") || li).appendChild(row);
  });

})();
