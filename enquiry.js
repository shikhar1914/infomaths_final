/* =============================================================
   enquiry.js — Shared EmailJS submission handler for Infomaths
   Form HTML is hardcoded in each page; this file handles submit.
   ============================================================= */

function submitEnquiry(btn) {
  var form   = btn.closest('.enquiry-card-body');
  var name   = form.querySelector('.enq-name').value.trim();
  var course = form.querySelector('.enq-course').value;
  var phone  = form.querySelector('.enq-phone').value.trim();
  var msg    = form.querySelector('.enq-msg');

  if (!name) {
    showEnqMsg(msg, 'error', 'Please enter your full name.');
    return;
  }
  if (!phone || phone.length < 10) {
    showEnqMsg(msg, 'error', 'Please enter a valid 10-digit phone number.');
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
    showEnqMsg(msg, 'success', '✓ Thank you! Our counselor will call you shortly.');
    btn.textContent = 'Submitted ✓';
    form.querySelector('.enq-name').value = '';
    form.querySelector('.enq-phone').value = '';
    form.querySelector('.enq-course').selectedIndex = 0;
    setTimeout(function() {
      btn.disabled    = false;
      btn.textContent = 'Submit Your Enquiry';
    }, 5000);
  }, function(error) {
    showEnqMsg(msg, 'error', '✗ Something went wrong. Please call us directly.');
    btn.disabled    = false;
    btn.textContent = 'Submit Your Enquiry';
    console.error('EmailJS error:', error);
  });
}

function showEnqMsg(el, type, text) {
  el.style.color   = type === 'success' ? '#27ae60' : '#c0392b';
  el.textContent   = text;
  el.style.display = 'block';
}
