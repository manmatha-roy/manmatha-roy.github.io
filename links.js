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
  "Arijit Ghosh":             "https://www.isical.ac.in/~arijit/",
  "Swarnalipa Dutta":         "https://dblp.org/search?q=Swarnalipa+Dutta",
  "Chandrima Kayal":          "https://dblp.org/search?q=Chandrima+Kayal",
  "Manaswi Paraashar":        "https://dblp.org/search?q=Manaswi+Paraashar",
  "Sourav Chakraborty":       "https://dblp.org/search?q=Sourav+Chakraborty",
  "Bimal Mandal":             "https://dblp.org/search?q=Bimal+Mandal",
  "Deng Tang":                "https://dblp.org/search?q=Deng+Tang",
  "Anupam Chattopadhyay":     "https://dblp.org/search?q=Anupam+Chattopadhyay",
  "Nikolay Stoyanov Kaleyski":"https://dblp.org/search?q=Nikolay+Kaleyski",
};


/* ---------- 2. Papers ----------------------------------------------

   The key on the left matches the data-key="..." on each paper in
   research.html. Fill in whichever URLs you have and delete the rest —
   blank ones are skipped.

   "dblp": "auto" builds a DBLP search link from the paper's title.
   Handy until you paste the real arXiv / DOI link in.                */

const PAPERS = {

  /* --- manuscripts --- */
  "nonlinearity-estimation": { arXiv: "", ePrint: "", pdf: "" },
  "distribution-free":       { arXiv: "", ePrint: "", pdf: "" },
  "sumset-size":             { arXiv: "", ePrint: "", pdf: "" },
  "near-optimal-testing":    { arXiv: "", ePrint: "", pdf: "" },
  "exact-recovery":          { arXiv: "", ePrint: "", pdf: "" },
  "arithmetic-regularity":   { arXiv: "", ePrint: "", pdf: "" },

  /* --- published --- */
  "spectral-shadows": { arXiv: "", DOI: "", dblp: "auto", slides: "", video: "" },
  "implicit-sensing": { arXiv: "", DOI: "", dblp: "auto", slides: "", poster: "",
                        /* OpenReview page for the ICLR version */ link: "" },
  "economical-sieve": { arXiv: "", DOI: "", dblp: "auto", slides: "", video: "" },

  "price-of-parsimony":   { arXiv: "", DOI: "", dblp: "auto", slides: "", poster: "" },
  "iso-abelian":          { arXiv: "", DOI: "", dblp: "auto", slides: "" },
  "maiorana-mcfarland":   { ePrint: "", DOI: "", dblp: "auto" },
  "differential-uniformity": { ePrint: "", DOI: "", dblp: "auto", slides: "" },

  "bent-balanced":  { ePrint: "", DOI: "", dblp: "auto" },
  "sbox-spectra":   { ePrint: "", DOI: "", dblp: "auto" },
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

  /* --- add the link row under each paper ---------------------------- */

  document.querySelectorAll("[data-key]").forEach(li => {
    const spec = PAPERS[li.getAttribute("data-key")];
    if (!spec) return;

    const title = (li.querySelector(".pub-title") || {}).textContent || "";
    const row = document.createElement("div");
    row.className = "pub-links";

    const LABELS = { dblp: "DBLP", pdf: "PDF", doi: "DOI", link: "page" };

    Object.keys(spec).forEach(label => {
      let url = spec[label];
      if (!url) return;
      if (url === "auto") {
        url = "https://dblp.org/search?q=" + encodeURIComponent(title.trim());
      }
      const a = document.createElement("a");
      a.href = url;
      a.textContent = LABELS[label.toLowerCase()] || label;
      row.appendChild(a);
    });

    if (row.childNodes.length) li.appendChild(row);
  });

})();
