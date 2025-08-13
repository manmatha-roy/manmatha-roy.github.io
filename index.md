---
layout: default
title: Home
---



<style>
.hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Mobile first: stack vertically on small screens */
@media (max-width: 767px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .hero img.profile-photo {
    order: 1;
    max-width: 150px;
    width: 100%;
    height: auto;
  }
  .hero .hero-text {
    order: 2;
  }
  .hero .cta {
    order: 3;
    margin-top: 0.5rem;
  }
  .about {
    margin-top: 2rem;
    padding: 0 1rem;
  }
}
</style>

<section class="hero">
  <img src="/assets/profile.jpg" alt="Profile photo" class="profile-photo" />
  <div class="hero-text">
    <h1>Manmatha Roy</h1>
    <p class="lead">Associate Scientist A, Indian Statistical Institute, Kolkata</p>
  </div>
</section>

<section class="about" style="font-size: 1.15rem; line-height: 1.6; max-width: 700px; margin: 1.5rem auto;">
<p>
  I am a researcher at the Indian Statistical Institute, Kolkata, where I am also pursuing a PhD under the joint supervision of 
  <a href="https://isi.irins.org/profile/61161" target="_blank">Prof. Subhamoy Maitra</a> and 
  <a href="https://sites.google.com/site/homepagearijitghosh/" target="_blank">Dr. Arijit Ghosh</a>. 
  My research interests are in Theoretical Computer Science, with a focus on Boolean-valued functions over discrete algebraic structures. 
  I investigate their structural properties and develop efficient algorithms for learning and testing these functions, 
  with applications to cryptography, coding theory, and learning theory.
</p>

<p>
Before moving to ISI Kolkata, I spent several years at the Centre for Distributed Computing, Jadavpur University, where I contributed to projects involving the design and development of high-performance software systems, with a strong emphasis on resilience and reliability for mission and safety critical infrastructure applications.
</p>

<p>
  You may find my résumé  
  <a href="assets/docs/resume.pdf" target="_blank">here</a>. 
</p>

<p>
  <!-- Feel free to reach me at <img src="assets/email.png" alt="Email Address" style="vertical-align: middle;"> -->
  Feel free to reach me at
  <span style="font-family: 'Courier New', Courier, monospace;">
    reach dot firstname @  gmail dot com
  </span>
</p>


</section>



