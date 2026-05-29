(function () {
  const slides = [
    {
      id: 'intro',
      kicker: 'Welcome',
      title: 'A clearer first COI entry',
      body: 'Before the initial Conflict of Interest form opens, members see a short visual orientation that explains the new entry experience and why NIH-supported teams are using it.',
      points: [
        'Introduces the new COI entry in under a minute.',
        'Frames the work as efficiency for NIH, DSMB teams, and government oversight.',
        'Sets expectations before the member starts entering responses.'
      ],
      rail: 'Intro',
      visual: renderIntroVisual
    },
    {
      id: 'integrity',
      kicker: 'Why It Matters',
      title: 'Disclosure protects DSMB integrity',
      body: 'COI disclosure is not paperwork for its own sake. It helps preserve independent judgment, supports credible safety oversight, and strengthens public trust in clinical research.',
      points: [
        'DSMB decisions depend on transparent, independent review.',
        'Clear disclosure helps reviewers identify real or perceived conflicts.',
        'Public trust is strongest when conflicts are named, reviewed, and managed.'
      ],
      rail: 'Trust',
      visual: renderIntegrityVisual
    },
    {
      id: 'questions',
      kicker: 'Step 1',
      title: 'Answer the required questions',
      body: 'The member starts by answering the COI questions shown on the form. Required answers should be direct and complete before moving into explanations.',
      points: [
        'Answer each required Yes/No question.',
        'Review the member, DSMB, and study context at the top.',
        'The form can show follow-up fields based on the response.'
      ],
      rail: 'Questions',
      visual: () => renderFormVisual('questions')
    },
    {
      id: 'details',
      kicker: 'Step 2',
      title: 'Describe the specific COI',
      body: 'If a conflict or potential conflict exists, the member describes the specific relationship so reviewers can understand the nature, timing, and relevance.',
      points: [
        'Name the organization, sponsor, role, payment, equity, or relationship.',
        'Include timing and how the relationship connects to the study.',
        'Write enough detail for review without requiring a follow-up.'
      ],
      rail: 'Details',
      visual: () => renderFormVisual('details')
    },
    {
      id: 'supporting',
      kicker: 'Step 3',
      title: 'Add any other helpful information',
      body: 'The final open text area gives the member space to include additional context, mitigation notes, or clarification that may help DSMB COI reviewers.',
      points: [
        'Use this area for clarifying notes or mitigation context.',
        'Mention documents or prior disclosure history if relevant.',
        'Leave it blank only when there is truly nothing else to add.'
      ],
      rail: 'More Info',
      visual: () => renderFormVisual('supporting')
    },
    {
      id: 'signature',
      kicker: 'Electronic Signature',
      title: 'Submission starts e-signature',
      body: 'When the member submits the form, CROMS begins an electronic signature step. The disclosure is not final until authentication and confirmation are complete.',
      points: [
        'Clicking Submit launches the signature handoff.',
        'The system records the signed attestation with the COI submission.',
        'Members should expect one more authentication step.'
      ],
      rail: 'E-Sign',
      visual: renderSignatureVisual
    },
    {
      id: 'login',
      kicker: '.gov Handoff',
      title: 'Sign in again on the .gov page',
      body: 'After submission, the screen leaves the form and opens the secure .gov login page. The member signs in again and is then redirected back to the COI form.',
      points: [
        'This sign-in verifies the electronic signature.',
        'The handoff is expected and part of final submission.',
        'After successful sign-in, the member returns to CROMS.'
      ],
      rail: '.gov Login',
      visual: renderGovLoginVisual
    },
    {
      id: 'confirm',
      kicker: 'Final Check',
      title: 'Confirm submission at the bottom',
      body: 'After redirect, the member returns to the COI form and confirms submission at the bottom of the page. That final confirmation completes the entry.',
      points: [
        'Review the returned form status.',
        'Use the final confirmation button at the bottom.',
        'Submitted COIs move forward for review.'
      ],
      rail: 'Confirm',
      visual: renderConfirmVisual
    },
    {
      id: 'thanks',
      kicker: 'Thank You',
      title: 'Thank you for working with NIA',
      body: 'Thank you for working with NIA and for your support of our research enterprise. Your timely COI disclosure helps protect DSMB integrity, participant safety, and public trust in clinical research.',
      points: [
        'Your disclosure supports independent DSMB safety oversight.',
        'Your participation helps NIA maintain confidence in the research enterprise.',
        'The COI entry is complete and ready for review.'
      ],
      rail: 'Thank You',
      visual: renderThankYouVisual
    }
  ];

  const state = {
    index: 0,
    hasStarted: false
  };

  const elements = {};

  function init() {
    elements.visualStage = document.getElementById('visualStage');
    elements.slideKicker = document.getElementById('slideKicker');
    elements.slideTitle = document.getElementById('slideTitle');
    elements.slideBody = document.getElementById('slideBody');
    elements.talkingPoints = document.getElementById('talkingPoints');
    elements.prevButton = document.getElementById('prevButton');
    elements.nextButton = document.getElementById('nextButton');
    elements.startButton = document.getElementById('startButton');
    elements.restartButton = document.getElementById('restartButton');
    elements.stepCounter = document.getElementById('stepCounter');
    elements.progressDots = document.getElementById('progressDots');
    elements.slideRail = document.getElementById('slideRail');

    elements.prevButton.addEventListener('click', previous);
    elements.nextButton.addEventListener('click', next);
    elements.startButton.addEventListener('click', () => {
      state.hasStarted = true;
      state.index = 0;
      render();
    });
    elements.restartButton.addEventListener('click', () => {
      state.hasStarted = false;
      state.index = 0;
      render();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        next();
      }

      if (event.key === 'ArrowLeft') {
        previous();
      }
    });

    render();
  }

  function previous() {
    state.hasStarted = true;
    state.index = Math.max(0, state.index - 1);
    render();
  }

  function next() {
    state.hasStarted = true;
    state.index = Math.min(slides.length - 1, state.index + 1);
    render();
  }

  function goTo(index) {
    state.hasStarted = true;
    state.index = index;
    render();
  }

  function render() {
    const slide = slides[state.index];

    elements.visualStage.innerHTML = slide.visual();
    elements.slideKicker.textContent = slide.kicker;
    elements.slideTitle.textContent = slide.title;
    elements.slideBody.textContent = slide.body;
    elements.stepCounter.textContent = `${state.index + 1} of ${slides.length}`;
    elements.prevButton.disabled = state.index === 0;
    elements.nextButton.textContent = state.index === slides.length - 1 ? 'Done' : 'Next';
    elements.startButton.textContent = state.hasStarted ? 'Replay' : 'Start';

    elements.talkingPoints.innerHTML = slide.points.map(point => `
      <div class="talking-point">
        <span aria-hidden="true"></span>
        <p>${escapeHtml(point)}</p>
      </div>
    `).join('');

    elements.progressDots.innerHTML = slides.map((item, index) => `
      <button
        type="button"
        class="dot ${index === state.index ? 'active' : ''}"
        aria-label="Open ${escapeHtml(item.rail)}"
        aria-current="${index === state.index ? 'step' : 'false'}"
        data-slide-index="${index}"
      ></button>
    `).join('');

    elements.slideRail.innerHTML = slides.map((item, index) => `
      <button
        type="button"
        class="rail-item ${index === state.index ? 'active' : ''}"
        data-slide-index="${index}"
      >
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(item.rail)}</strong>
      </button>
    `).join('');

    document.querySelectorAll('[data-slide-index]').forEach(button => {
      button.addEventListener('click', () => goTo(Number(button.getAttribute('data-slide-index'))));
    });
  }

  function renderIntroVisual() {
    const blocks = Array.from({ length: 18 }, (_, index) => `<span style="--i:${index}"></span>`).join('');

    return `
      <section class="intro-visual" aria-label="Animated COI entry introduction">
        <div class="block-field">${blocks}</div>
        <div class="intro-copy">
          <p class="mini-label">New COI entry</p>
          <h3>Built for faster, clearer DSMB disclosure</h3>
          <p>Helping NIH-supported oversight teams move from form entry to review with less friction.</p>
        </div>
        <div class="pixel-document">
          <div class="doc-top"></div>
          <div class="doc-line wide"></div>
          <div class="doc-line"></div>
          <div class="doc-choice yes">Yes</div>
          <div class="doc-choice">Describe</div>
          <div class="doc-submit">Submit</div>
        </div>
      </section>
    `;
  }

  function renderIntegrityVisual() {
    return `
      <section class="integrity-visual" aria-label="Integrity and trust overview">
        <div class="trust-path">
          <div class="trust-node">
            <span>1</span>
            <strong>Disclosure</strong>
            <p>Member identifies actual or perceived interests.</p>
          </div>
          <div class="trust-node">
            <span>2</span>
            <strong>Review</strong>
            <p>COI reviewers evaluate relevance and next steps.</p>
          </div>
          <div class="trust-node">
            <span>3</span>
            <strong>Trust</strong>
            <p>Transparent oversight supports confidence in research.</p>
          </div>
        </div>
        <div class="integrity-seal">
          <span>DSMB</span>
          <strong>Independent safety oversight</strong>
        </div>
      </section>
    `;
  }

  function renderFormVisual(mode) {
    const yesSelected = mode !== 'questions' ? 'selected' : '';
    const detailFocused = mode === 'details' ? 'focused' : '';
    const supportingFocused = mode === 'supporting' ? 'focused' : '';

    return `
      <section class="visual-window" aria-label="Illustrative COI form visual">
        ${browserChrome('CROMS COI Form')}
        <div class="mock-app-header">
          <strong>Conflict of Interest Form</strong>
          <span>DSMB-TRN-001 | TRAIN-STUDY-001 | Dr. Reviewer A</span>
        </div>
        <div class="mock-form-body">
          <div class="form-context">
            <div>
              <span>Member</span>
              <strong>Dr. Reviewer A</strong>
            </div>
            <div>
              <span>Study</span>
              <strong>TRAIN-STUDY-001</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>In Progress</strong>
            </div>
          </div>
          <div class="question-block ${mode === 'questions' ? 'highlighted' : ''}">
            <p class="question-label">Required question</p>
            <h4>Do you have a financial, professional, or perceived conflict related to this study?</h4>
            <div class="answer-row">
              <span class="radio-pill ${yesSelected || mode === 'questions' ? 'selected' : ''}">Yes</span>
              <span class="radio-pill">No</span>
            </div>
          </div>
          <label class="mock-textarea ${detailFocused}">
            <span>Description of specific COI</span>
            <p>${mode === 'details' ? 'Consulting relationship with an organization developing a related intervention. Relationship began in 2025 and is not study-funded.' : 'Provide organization, relationship, timing, financial interest, and relevance to the study.'}</p>
          </label>
          <label class="mock-textarea ${supportingFocused}">
            <span>Any other information for reviewers</span>
            <p>${mode === 'supporting' ? 'Prior disclosure was submitted during member onboarding. No study data access has occurred under this relationship.' : 'Add clarification, mitigation context, or supporting notes.'}</p>
          </label>
        </div>
      </section>
    `;
  }

  function renderSignatureVisual() {
    return `
      <section class="visual-window" aria-label="Electronic signature preview">
        ${browserChrome('CROMS COI Form')}
        <div class="mock-app-header">
          <strong>Ready to Submit</strong>
          <span>Electronic signature required</span>
        </div>
        <div class="signature-layout">
          <div class="attestation-box">
            <p class="mini-label">Attestation</p>
            <h4>I certify that this COI disclosure is complete and accurate to the best of my knowledge.</h4>
            <div class="signature-line">
              <span></span>
              <strong>Dr. Reviewer A</strong>
            </div>
          </div>
          <div class="submit-flow">
            <div class="flow-step active">Submit</div>
            <div class="flow-arrow"></div>
            <div class="flow-step">.gov sign-in</div>
            <div class="flow-arrow"></div>
            <div class="flow-step">Confirm</div>
          </div>
        </div>
      </section>
    `;
  }

  function renderGovLoginVisual() {
    return `
      <section class="handoff-visual" aria-label="Illustrative .gov login handoff">
        <div class="handoff-card form-side">
          ${browserChrome('CROMS')}
          <div class="tiny-form">
            <strong>COI Form</strong>
            <p>Submit selected</p>
            <span class="status-strip">Redirecting for e-signature</span>
          </div>
        </div>
        <div class="handoff-arrow">-></div>
        <div class="handoff-card login-side">
          ${browserChrome('secure .gov sign-in')}
          <div class="login-mock">
            <p class="training-label">Training preview</p>
            <h4>Secure .gov sign-in</h4>
            <label>Email address</label>
            <div class="fake-input"></div>
            <label>Password</label>
            <div class="fake-input short"></div>
            <button type="button">Sign in</button>
          </div>
        </div>
        <div class="handoff-arrow">-></div>
        <div class="handoff-card form-side">
          ${browserChrome('CROMS')}
          <div class="tiny-form">
            <strong>COI Form</strong>
            <p>Redirect complete</p>
            <span class="status-strip good">Signature verified</span>
          </div>
        </div>
      </section>
    `;
  }

  function renderConfirmVisual() {
    return `
      <section class="visual-window confirm-window" aria-label="Final confirmation visual">
        ${browserChrome('CROMS COI Form')}
        <div class="mock-app-header">
          <strong>Conflict of Interest Form</strong>
          <span>Returned from e-signature</span>
        </div>
        <div class="mock-form-body bottom-view">
          <div class="review-summary">
            <span class="checkmark">OK</span>
            <div>
              <h4>Signature verified</h4>
              <p>Review your submission status, then confirm at the bottom to complete the COI entry.</p>
            </div>
          </div>
          <div class="bottom-confirm">
            <label>
              <span class="checkbox checked"></span>
              <strong>I confirm this COI submission is complete.</strong>
            </label>
            <button type="button">Confirm Submission</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderThankYouVisual() {
    const blocks = Array.from({ length: 30 }, (_, index) => `<span style="--i:${index}"></span>`).join('');

    return `
      <section class="thankyou-visual" aria-label="Animated thank you closing">
        <div class="thankyou-blocks" aria-hidden="true">${blocks}</div>
        <div class="thankyou-message">
          <p class="mini-label">NIA research enterprise</p>
          <h3>Thank you for your support</h3>
          <p>Transparent COI disclosure helps DSMB members, NIA teams, and reviewers keep clinical research moving with integrity.</p>
          <div class="thankyou-ribbon">
            <span>COI submitted</span>
            <span>DSMB integrity</span>
            <span>Public trust</span>
          </div>
        </div>
        <div class="research-map" aria-hidden="true">
          <div class="map-line horizontal"></div>
          <div class="map-line vertical"></div>
          <span class="map-node nia">NIA</span>
          <span class="map-node dsmb">DSMB</span>
          <span class="map-node studies">Studies</span>
          <span class="map-node public">Trust</span>
        </div>
      </section>
    `;
  }

  function browserChrome(title) {
    return `
      <div class="browser-chrome">
        <span></span>
        <span></span>
        <span></span>
        <strong>${escapeHtml(title)}</strong>
      </div>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
