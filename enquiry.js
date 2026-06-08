/* =============================================================
   enquiry.js — Shared enquiry form handler for all Infomaths pages
   EmailJS public key is initialised once here via the <script> tag
   that loads this file (see each HTML page's <head>).
   ============================================================= */

/* ---- Shared HTML for the enquiry form body ---- */
var ENQUIRY_FORM_INNER_HTML = `
  <input type="text" id="enq-name" placeholder="Your Full Name" autocomplete="name">
  <select id="enq-course">
    <option value="" disabled selected>Course Interested In</option>
    <option>MCA Entrance (NIMCET / CUET PG / MAH CET)</option>
    <option>IIT JAM Maths</option>
    <option>CSIR NET JRF</option>
    <option>Bank PO &amp; SSC CGL</option>
    <option>BCA Subject Classes</option>
    <option>BSc Subject Classes</option>
    <option>Campus Placements</option>
    <option>Internship &amp; Skill Development</option>
  </select>
  <div class="phone-group">
    <input type="text" class="phone-code" value="+91" readonly>
    <input type="tel" id="enq-phone" placeholder="Your Phone Number"
           inputmode="numeric" pattern="[0-9]*"
           oninput="this.value=this.value.replace(/\\D/g,'')">
  </div>
  <button class="btn-primary enq-submit-btn" type="button"
          style="width:100%;border:none;"
          onclick="submitEnquiry(this)">Submit Your Enquiry</button>
  <p class="enq-msg" style="margin-top:8px;font-size:0.88rem;display:none;"></p>
`;

/* ---- Inject form HTML into every .enquiry-card-body on the page ---- */
function initEnquiryForms() {
  document.querySelectorAll('.enquiry-card-body').forEach(function(body) {
    body.innerHTML = ENQUIRY_FORM_INNER_HTML;
  });
}

/* ---- Single submit handler (called by every button) ---- */
function submitEnquiry(btn) {
  /* Walk up to the nearest .enquiry-card-body to scope field lookups */
  var form   = btn.closest('.enquiry-card-body');
  var name   = form.querySelector('#enq-name').value.trim();
  var course = form.querySelector('#enq-course').value;
  var phone  = form.querySelector('#enq-phone').value.trim();
  var msg    = form.querySelector('.enq-msg');

  /* Basic validation */
  if (!name) {
    showMsg(msg, 'error', 'Please enter your full name.');
    return;
  }
  if (!phone || phone.length < 10) {
    showMsg(msg, 'error', 'Please enter a valid 10-digit phone number.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  emailjs.send(
    'service_mu8k2qy',
    'template_fyw3fnh',
    {
      from_name:       name,
      course_interest: course || 'Not specified',
      phone_number:    phone,
      page_source:     window.location.pathname
    }
  ).then(function() {
    showMsg(msg, 'success', '✓ Thank you! Our counselor will call you shortly.');
    btn.textContent = 'Submitted ✓';
    form.querySelector('#enq-name').value  = '';
    form.querySelector('#enq-phone').value = '';
    form.querySelector('#enq-course').selectedIndex = 0;
    /* Re-enable after 5 s so user can submit again if needed */
    setTimeout(function() {
      btn.disabled    = false;
      btn.textContent = 'Submit Your Enquiry';
    }, 5000);
  }, function(error) {
    showMsg(msg, 'error', '✗ Something went wrong. Please call us directly.');
    btn.disabled    = false;
    btn.textContent = 'Submit Your Enquiry';
    console.error('EmailJS error:', error);
  });
}

function showMsg(el, type, text) {
  el.style.color   = type === 'success' ? '#27ae60' : '#c0392b';
  el.textContent   = text;
  el.style.display = 'block';
}

/* ---- Run after DOM is ready ---- */
document.addEventListener('DOMContentLoaded', function() {
  initEnquiryForms();
});
