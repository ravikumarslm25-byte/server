/* ============================================================
   Legal pages for oximuspro.com.

   Seeded into the Page collection; after that HackGeniX edits them in
   the platform console. Written against what Oximus Pro actually does
   (no video or audio recording, eye movement and answer timing computed
   on the candidate's device, data in India, people decide), and drafted
   to protect HackGeniX and the Oximus brand:

     - the Company is the data fiduciary and owns every hiring decision;
     - signals are evidence, never findings, and detection is not promised;
     - liability is capped and indirect loss excluded;
     - misuse that could harm candidates or the brand is prohibited and
       grounds for immediate suspension;
     - the names, logo and product stay HackGeniX's.

   {{salesEmail}} {{supportEmail}} {{privacyEmail}} {{phone}}
   {{grievanceOfficer}} {{address}} are filled from Site settings when a
   page is shown.

   NOT LEGAL ADVICE. Have counsel review before launch.
   ============================================================ */

export const COMPANY = {
  legal: 'HackGeniX Tech Private Limited',
  cin: 'U62013TZ2025PTC035022',
  gstin: '33AAICH0065K1ZO',
  address: 'COWRKS, OMR, Campus 3B, Millenia Business Park, Phase 2, MGR Main Road, Kandhanchavadi, Perungudi, Chennai – 600096, Tamil Nadu, India',
  incorporated: '13 June 2025',
};

const C = COMPANY.legal;

/* ================================================================== */
const TERMS = `
## 1. About these terms

These Terms and Conditions ("Terms") govern access to and use of Oximus Pro, an online interview, assessment and interview-monitoring service, and the website oximuspro.com (together, the "Service"), provided by ${C} (CIN ${COMPANY.cin}), with its registered office at {{address}} ("HackGeniX", "we", "us", "our").

By creating an account, accepting a quotation, placing an order, clicking to accept, or using the Service, you agree to these Terms on behalf of the organisation you represent, and you confirm that you have authority to bind it. If you do not agree, do not use the Service.

Where your organisation has signed an order form or master agreement with us, that document takes precedence over these Terms wherever the two conflict. Our [Privacy Policy](/privacy-policy), [Acceptable Use Policy](/acceptable-use-policy), [Data Processing Agreement](/data-processing-agreement), [Cookie Policy](/cookie-policy) and [Cancellation and Refund Policy](/refund-policy) form part of these Terms.

This document is an electronic record under the Information Technology Act, 2000 and the rules made under it, and does not require a physical or digital signature.

## 2. Definitions

- **Company**, **you** — the consultancy, employer, institution or other organisation that licenses the Service.
- **Authorised User** — an individual the Company gives a staff account to, such as an administrator, recruiter or interviewer.
- **Candidate** — an individual the Company invites to take an assessment or interview on the Service.
- **Client** — a business the Company recruits for, where the Company is a recruitment consultancy.
- **Round** — one online assessment or one live interview taken by one Candidate.
- **Credit** — the right for one Candidate to take one Round.
- **Order** — a quotation or order form you accept, a purchase order we acknowledge, or a purchase through our website or app.
- **Company Data** — data that the Company, its Authorised Users and its Candidates submit to the Service, including jobs, questions, answers, scores, scorecards, notes and monitoring captures.
- **Signal** — an automated record that the Service detected an event during a Round, such as eye movement consistent with reading, a long silence before a fluent answer, text that appeared without typing, a second display or a device seen by the phone camera.
- **Usage Data** — technical and statistical information about how the Service is used and performs, which does not identify any Candidate or Authorised User.

## 3. Eligibility and accounts

The Service is for businesses and institutions, not for consumers. Authorised Users must be at least 18 years old. The Company is responsible for everyone it gives access to, for the roles and permissions it assigns, and for all activity under its accounts. Each person must have their own account; credentials must not be shared. Tell us immediately at {{supportEmail}} if you suspect unauthorised access.

## 4. What the Service does — and does not do

The Service provides online assessments, live interview rooms, monitoring that raises Signals, reports, and related tools, as described on our website and in your Order.

**Signals are evidence, not findings.** A Signal records what software detected. Automated checks can be wrong — because of lighting, a shared room, a slow connection, a disability, a medical condition, or simply the way a person thinks before answering. **Every decision about a Candidate — misconduct, rejection, selection or anything else — must be made by a person at the Company after reviewing the evidence.** HackGeniX does not make, recommend or validate hiring decisions.

**No guarantee of detection.** A web browser cannot see every device, application, person or technique a Candidate may use. We do not warrant that the Service will prevent or detect all cheating, impersonation, AI assistance or other misconduct, or that every Signal is accurate.

**Not an employer, agent or background-check provider.** HackGeniX is not a party to any employment or engagement between the Company, its Clients and Candidates, and does not verify the identity, qualifications or history of any Candidate.

Features may change as the Service develops. We will not materially reduce the core functionality of a plan during a paid term.

## 5. Credits, orders and payment

- Scheduling a Round reserves a Credit; starting the Round uses it. A cancelled Round, or one the Candidate never joins, returns the reserved Credit.
- If a Round cannot be completed because of a fault in the Service, the Credit for that Round is returned. This is the Company's sole remedy for an individual failed Round.
- Credits are valid for the term in your Order and, unless your Order says otherwise, expire at the end of it. Credits have no cash value, cannot be transferred to another organisation and are not refundable except as our [Cancellation and Refund Policy](/refund-policy) states.
- Fees are set out in your Order, quoted in Indian rupees and exclusive of Goods and Services Tax, which is charged at the applicable rate (GSTIN ${COMPANY.gstin}). Unless your Order says otherwise, fees are payable in advance and invoices are due within fifteen days.
- Where tax must be deducted at source, the Company will provide the deduction certificate within the period the law requires.
- If an amount is overdue, we may, after seven days' written notice, suspend the scheduling of new Rounds until it is paid. We will not interrupt a Round already in progress for non-payment.
- Online payments are processed by third-party payment gateways. We do not see or store full card numbers, UPI PINs or banking passwords. Raising a chargeback without first contacting us is a breach of these Terms.
- We may change our list prices for future terms with at least thirty days' notice. Prices agreed in an Order do not change during that Order's term.

## 6. The Company's responsibilities

The Company is solely responsible for:

- deciding how each Round is run, which monitoring is switched on, and what counts as misconduct;
- giving every Candidate clear notice of how they will be monitored and what data will be collected, and obtaining any consent the law requires, before the Round. The Service shows Candidates a notice and asks them to agree before they start; this supports, and does not replace, the Company's own obligations;
- having a lawful basis for processing Candidate data and for sharing reports with Clients, and complying with the Digital Personal Data Protection Act, 2023, employment, anti-discrimination, disability and other laws that apply to its hiring;
- making reasonable adjustments for Candidates with disabilities or other needs, including switching off checks that would be unfair to them;
- not inviting anyone under 18 unless verifiable consent of a parent or lawful guardian has been obtained as the law requires;
- the accuracy and lawfulness of the jobs, questions, answer keys and other content it uploads; and
- every hiring decision it or its Clients make.

## 7. Candidates

Candidates use the Service at the invitation of a Company. Their relationship is with that Company, which is responsible for their data and for any decision about them. Candidates must not attempt to defeat, disable or mislead the monitoring, share their invitation link, have another person take a Round for them, or record, copy or publish questions. Questions about a Round or a decision should go to the Company that sent the invitation.

## 8. Acceptable use

Use of the Service is subject to our [Acceptable Use Policy](/acceptable-use-policy). In particular, the Service may not be used to monitor anyone who has not been told they are being monitored, for any purpose other than assessment and hiring, or in a way that discriminates against, harasses or publicly shames a Candidate.

## 9. Company Data

As between the parties, the Company owns Company Data. The Company grants HackGeniX a non-exclusive licence to host, process, transmit and display Company Data only to provide, secure and support the Service and as the Company instructs. HackGeniX processes personal data in Company Data as the Company's data processor under our [Data Processing Agreement](/data-processing-agreement).

**We do not sell Company Data, use it for advertising, or use Candidates' answers, images or recordings to train AI models.**

We may collect and use Usage Data to operate, secure and improve the Service, and may publish aggregated statistics that do not identify the Company, any Client, Candidate or individual.

## 10. Optional AI features

Some plans can use an AI model to draft follow-up questions for the final-round check. When the Company switches this on, the job title, the job's skills and the selected questions with their expected answers are sent to the model provider. The Candidate's name, contact details, answers and pictures are not sent. AI-drafted content may be inaccurate; the Company must review it before use.

## 11. Our intellectual property and brand

HackGeniX and its licensors own the Service, including its software, algorithms, detection methods, design, shared question library, documentation and all improvements to them. These Terms give the Company a limited, non-exclusive, non-transferable right to use the Service during its paid term for its own hiring and its Clients' hiring. They do not transfer ownership of anything.

"Oximus", "Oximus Pro", the Oximus logo and emblem, "HackGeniX" and related names, logos and taglines are trademarks of HackGeniX. You may not use them, or anything confusingly similar, in any domain name, company name, product, advertising or social media without our prior written permission — except to refer factually to the Service you use.

You must not, and must not allow anyone to: copy, modify, frame or create derivative works of the Service; reverse engineer, decompile or attempt to discover its source code, models or detection logic, except where the law expressly allows despite this restriction; probe, scan or test its security without our written permission; build or help build a competing product using the Service or our materials; or publish benchmarks, detection-evasion techniques or comparisons based on the Service without our written consent.

If you send us suggestions or feedback, we may use them freely without obligation to you.

Unless you tell us otherwise in writing, we may name the Company as a customer and show its logo on our website and in sales materials. You may withdraw this permission at any time by emailing {{salesEmail}}.

## 12. Confidentiality

Each party will keep the other's confidential information — including Company Data, pricing, product roadmaps, security information and non-public features — confidential, use it only for the purposes of these Terms, and protect it with at least reasonable care. This does not apply to information that is public through no fault of the receiving party, already known to it, independently developed, or lawfully received from a third party, or to disclosure the law or a court requires (with prompt notice where lawful).

## 13. Availability, support and third parties

We aim to keep the Service available 99.5% of the time each month, excluding scheduled maintenance announced in advance and events outside our reasonable control. Live video quality depends on each participant's device and connection. Support is available by email at {{supportEmail}} on working days. Any service-level commitment beyond this must be in a signed Order.

The Service relies on third parties such as cloud hosting, video relay, email and payment providers, and on the Candidate's own device, browser and network. We are not responsible for failures of networks, devices or services we do not control. Beta or preview features are provided as they are, may change or be withdrawn, and are excluded from any service level.

## 14. Warranties and disclaimers

Each party warrants that it has authority to enter into these Terms. We warrant that we will provide the Service with reasonable skill and care. **Except as expressly stated in these Terms, and to the fullest extent the law allows, the Service is provided "as is" and "as available", and we disclaim all other warranties, express or implied, including merchantability, fitness for a particular purpose, accuracy of Signals and non-infringement.**

## 15. Limitation of liability

To the fullest extent the law allows:

- **neither party is liable for any indirect, incidental, special, consequential or punitive loss, or for any loss of profit, revenue, business, goodwill, reputation or data**, however caused;
- **HackGeniX is not liable for any hiring, engagement or termination decision, or its consequences**, made by the Company, its Clients or anyone else, whether or not based on Signals or reports from the Service;
- **HackGeniX's total liability arising out of or relating to these Terms and the Service, in contract, tort (including negligence) or otherwise, is limited to the fees the Company actually paid for the Service in the twelve months before the event giving rise to the claim**; and
- any claim must be brought within one year after the cause of action arose.

Nothing in these Terms limits liability for fraud, wilful misconduct, or anything that cannot be limited by law, or the Company's obligation to pay fees and its indemnity under section 16.

## 16. Indemnity

The Company will defend, indemnify and hold harmless HackGeniX, its directors, employees and agents against all claims, demands, penalties, losses and reasonable costs (including legal fees) brought by Candidates, Clients, regulators or other third parties arising from: the Company's or its Clients' hiring decisions; the Company's failure to give notice, obtain consent or comply with law in relation to Candidates; content or data the Company uploads or shares; use of the Service in breach of these Terms or the Acceptable Use Policy; or any act of its Authorised Users.

HackGeniX will defend the Company against a third-party claim that the Service, as provided by us, infringes that party's intellectual property rights in India, and pay any damages finally awarded, provided the Company notifies us promptly, gives us control of the defence and cooperates. This does not apply to claims arising from Company Data, combinations with things we did not provide, or use in breach of these Terms. We may instead modify the Service to avoid infringement or end the affected part and refund prepaid fees for it.

## 17. Suspension

We may suspend access to all or part of the Service immediately, with notice where practicable, if we reasonably believe that: it is being used in breach of the Acceptable Use Policy or the law; there is a security threat or unauthorised access; continued use could harm Candidates, other customers, the Service or our reputation; or a court, regulator or law requires it. We will restore access once the cause is resolved. Suspension does not relieve the Company of its obligation to pay.

## 18. Term and termination

These Terms apply from your first use of the Service until every Order has ended. Either party may terminate an Order if the other materially breaches these Terms and does not remedy the breach within thirty days of written notice, or immediately if the other becomes insolvent. We may terminate immediately for a serious or repeated breach of the Acceptable Use Policy.

On termination, the Company's right to use the Service ends and unused Credits lapse, except where we terminate for convenience or for our own breach, in which case we refund prepaid fees for unused Credits. For thirty days after termination the Company may export its Company Data; after that we delete it, except where the law requires us to keep it. Sections that by their nature should survive — including 9 to 12 and 14 to 22 — survive termination.

## 19. Force majeure

Neither party is liable for failure or delay caused by events beyond its reasonable control, including natural disasters, epidemics, war, terrorism, riots, government action, power or internet failures, failures of third-party hosting or telecommunications providers, and cyber attacks not caused by its own negligence. Payment obligations are not excused.

## 20. Changes to these Terms

We may update these Terms. If a change materially affects the Company's rights, we will notify Company administrators by email at least thirty days before it takes effect, except where a change is required by law. Continuing to use the Service after the effective date means acceptance. The version in force at the start of an Order's term continues to apply to that Order where the change would otherwise increase fees or reduce committed features.

## 21. Governing law and disputes

These Terms are governed by the laws of India. The parties will first try to resolve any dispute by good-faith discussion between senior representatives for thirty days. Any dispute not resolved in that time shall be referred to arbitration by a sole arbitrator appointed by mutual agreement or, failing that, under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Chennai, Tamil Nadu, and the language English. Subject to this, the courts at Chennai, Tamil Nadu have exclusive jurisdiction. Either party may seek urgent interim relief from a competent court to protect its intellectual property or confidential information.

## 22. General

These Terms, with the documents they refer to and any Order, are the entire agreement between the parties about the Service. If any provision is unenforceable, the rest remains in effect. A failure to enforce a right is not a waiver. The Company may not assign these Terms without our written consent; we may assign them to an affiliate or a successor to our business. Nothing creates a partnership, agency or employment relationship. Notices to us must be sent to {{salesEmail}} and to our registered office; notices to the Company may be sent to its administrator's email address.

## 23. Contact

${C}, {{address}}. Email {{salesEmail}} · Support {{supportEmail}} · Phone {{phone}}.
`;

/* ================================================================== */
const PRIVACY = `
## 1. Who we are

Oximus Pro and oximuspro.com are provided by ${C} (CIN ${COMPANY.cin}), {{address}} ("HackGeniX", "we", "us"). This policy explains what personal data we handle, why, how long we keep it, and the rights you have. It is written to meet the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Digital Personal Data Protection Rules, 2025, and the Information Technology Act, 2000 with the rules made under it.

## 2. Our two roles

**Data fiduciary.** For visitors to our website, people who contact us or book a demo, and the business contacts of companies that license Oximus Pro, HackGeniX decides why and how data is used and is the data fiduciary.

**Data processor.** For Candidates, and for the staff a company adds to Oximus Pro, **the hiring company is the data fiduciary**. It decides who is invited, what is monitored, how long data is kept, and every decision about a Candidate. HackGeniX processes that data only on the company's instructions, under a [Data Processing Agreement](/data-processing-agreement). If you are a Candidate, please contact the company that invited you first; we will help it respond.

## 3. What we collect from visitors and customers

- **Enquiries and demo requests** — name, work email, phone, company, role, team size, hiring needs, your message, and how you found us (for example a campaign tag in the link).
- **Customer accounts and billing** — names and work emails of authorised users, billing address, GSTIN and payment records. Card and UPI details are handled by the payment gateway; we do not store them.
- **Website and security logs** — IP address, browser, device type, pages requested and time, kept to protect the website and the service.

## 4. What is collected during an assessment or interview

On behalf of the hiring company, depending on the checks it switches on:

- **Profile** — name, email, phone, experience and current employer, as given to the hiring company.
- **Notice and consent** — the notice the Candidate agreed to, with the time and network address.
- **Identity** — a photograph of the Candidate's face and of an identity document, taken before each round.
- **Webcam pictures** — still pictures at an interval the company sets (every 15 seconds by default), and pictures around each signal.
- **Phone camera** — when the Candidate pairs their phone, a side-view picture at intervals and a live view for the interviewers.
- **Screen** — where the round requires it, the entire screen is shared; pictures of it are kept at intervals and when a signal is raised, and it is shown live to interviewers in live rounds.
- **Live video and audio** — seen and heard by the interviewers during the round. **Oximus Pro does not record video or audio.**
- **Eye movement** — analysed on the Candidate's own device. Only the resulting signal and its time are sent to us; no eye-tracking video is sent.
- **Answer timing** — after a question, the Candidate's device measures the silence before speaking and how steadily they answer. Only timings are sent; no audio is sent or stored.
- **Typing** — whether text in an answer or code pad was typed or appeared all at once.
- **Sound in silent tests** — on the Candidate's device, whether speech or sustained noise is heard during an online test. Only the signal and its time are sent; no audio is sent or stored.
- **People and devices in view** — on the Candidate's device, the camera picture is checked for a second person, a mobile phone or another screen. Only the signal, with a still picture, is sent.
- **Leaving the round's window** — every round shares the Candidate's entire screen. When the Candidate switches away from the round, still pictures of the screen are kept, and the text in them is read automatically on our own servers (it is not sent to any AI provider) to check for AI tools, web searches, answer sites, documents, messaging apps or the round's own question.
- **Device information** — operating system, browser, screen size, number of displays, signs of a virtual machine or virtual camera, camera and microphone names, and IP address.
- **Answers and evaluation** — test answers and scores, code, whiteboard drawings, interviewers' ratings, notes and scorecards.

**Face images are used so that people at the hiring company can confirm the same person took each round. Oximus Pro does not perform automated face recognition, face matching or emotion analysis.**

We do not ask for, and Candidates should not provide, information about health, religion, caste, political views, sexual orientation or other sensitive matters.

## 5. Why we use personal data

- To run assessments and interviews on the hiring company's instructions.
- To protect the integrity of the hiring process by recording signals that a Candidate may be receiving outside help, for the hiring company to review.
- To prepare integrity reports and final-round checks for the hiring company.
- To reply to enquiries, prepare quotations, provide demos and manage customer relationships.
- To provide support, keep the service secure, prevent fraud and abuse, and fix faults.
- To meet legal, tax and regulatory obligations and to establish or defend legal claims.

**We do not sell personal data, use it for advertising or profiling, or use Candidates' answers or images to train AI models.**

## 6. Signals and decisions

A signal is a record for the hiring company to review. It is never, on its own, a finding of misconduct, and Oximus Pro does not decide whether a Candidate is hired. A company may choose to have an online test end when signals pass a limit it sets; live interviews are never ended automatically. If you believe a decision about you was unfair, raise it with the hiring company, which can review the evidence.

## 7. Who we share data with

- **The hiring company** — only staff whose role gives them access.
- **The hiring company's client**, where a recruitment consultancy shares reports for the job the Candidate applied for.
- **Service providers** who host data, store files, send email, relay video, run code or, where a company switches it on, draft final-round questions (job and question text only — no Candidate personal data). They act on our instructions and are bound by confidentiality and security obligations.
- **Payment gateways**, to process payments.
- **Authorities**, where the law, a court order or a lawful government request requires it, or to protect the rights, safety or property of Candidates, customers, the public or HackGeniX.
- **A successor**, if our business or assets are transferred, subject to this policy.

## 8. Where data is stored

Oximus Pro production data and monitoring captures are stored on cloud servers located in India. Some service providers, such as email delivery, may process limited data outside India; we only transfer data to countries not restricted by the Government of India under the DPDP Act and with appropriate safeguards.

## 9. Security

We use reasonable security safeguards appropriate to the data, including encryption in transit, private storage of pictures shown to staff through links that expire within minutes, separation of each company's data, role-based access, logging of administrative actions, and regular backups. No system is completely secure. If a personal data breach occurs, we will inform affected hiring companies without undue delay, and notify the Data Protection Board of India, affected individuals and CERT-In as the law requires.

## 10. How long we keep data

- **Monitoring captures** (pictures and signals) — for the period the hiring company sets, 180 days by default, then deleted automatically.
- **Answers, scores and scorecards** — while the hiring company's account is active or as it instructs, and deleted within thirty days after the account ends.
- **Enquiries and demo requests** — up to two years from our last contact, unless they become a customer relationship.
- **Billing and tax records** — as long as tax and company law require, currently up to eight years.
- **Security logs** — up to 180 days, longer where needed to investigate an incident.

## 11. Cookies and similar technologies

See our [Cookie Policy](/cookie-policy). In short: the website uses no advertising or tracking cookies, and Oximus Pro uses a strictly necessary cookie to keep you signed in.

## 12. Your rights

Subject to the DPDP Act, you may ask to access a summary of your personal data and how it is processed, correct, complete or update it, erase it where it is no longer needed or consent is withdrawn, withdraw consent (which does not affect processing already done), nominate a person to exercise your rights if you die or become incapable, and seek redress of grievances.

**Candidates** should write first to the hiring company that invited them, since it decides how their data is used; we will assist it. **Everyone else** may write to {{privacyEmail}}. We may need to verify your identity before acting on a request.

## 13. Grievance Officer

Grievance Officer: {{grievanceOfficer}}, ${C}, {{address}}. Email {{privacyEmail}} · Phone {{phone}}.

We acknowledge grievances within two working days and resolve them within one month. If you are not satisfied, you may complain to the Data Protection Board of India.

## 14. Children

The website and Oximus Pro are not intended for anyone under 18. Hiring companies must not invite a person under 18 unless verifiable consent of a parent or lawful guardian has been obtained as the law requires.

## 15. Changes to this policy

We may update this policy. The date at the top shows when it last changed. If a change materially affects how personal data is used, we will notify customer administrators by email before it takes effect.
`;

/* ================================================================== */
const REFUND = `
## 1. What this policy covers

This policy explains when orders for Oximus Pro can be cancelled and when payments are refunded by ${C}. Oximus Pro is a business-to-business software service used in a web browser. **Nothing physical is shipped and there are no shipping charges.** Where a signed order form contains different cancellation or refund terms, the order form applies.

## 2. Delivery of the service

- New company accounts are activated within two working days after payment is confirmed, or after we acknowledge a purchase order where payment on invoice has been agreed.
- Additional Credits are added within one working day after payment is confirmed.
- Access details are sent by email to the administrator named on the order. The service is delivered when the account is activated or the Credits appear in the company's balance.

## 3. Cancelling before activation

You may cancel an order before your account is activated or Credits are added by emailing {{supportEmail}}. We refund the full amount paid for that order.

## 4. After activation

Once an account has been activated or Credits added, **fees are non-refundable**, because onboarding, capacity and licences begin at that point. In particular:

- unused Credits are not refundable and lapse at the end of the term in your order unless it says otherwise;
- plan or subscription fees for a term that has started are not refunded for unused time, downgrades or early cancellation;
- onboarding, training and setup fees are not refundable once the work has started.

You may cancel renewal at any time before the next term begins; the current term continues until it ends.

## 5. No-shows and cancelled rounds

A Credit is used only when a Candidate starts a round. If a Candidate never joins, or you cancel a scheduled round, the reserved Credit returns to your balance automatically. This is a return of Credit, not a cash refund.

## 6. When we are at fault

- If a Candidate cannot complete a round because of a fault in Oximus Pro, the Credit for that round is returned to your balance.
- If Oximus Pro is unavailable for more than three consecutive working days through our fault, and we cannot restore it, you may ask for a refund of fees prepaid for the unused part of the term and unused Credits for the affected period.
- If we end your access for our convenience, we refund prepaid fees for the unused part of the term and unused Credits.

These are your sole remedies for service failures, subject to our [Terms and Conditions](/terms).

## 7. No refund where access is suspended or ended for breach

No refund is due where we suspend or end access because of a breach of our [Terms and Conditions](/terms) or [Acceptable Use Policy](/acceptable-use-policy), or for non-payment.

## 8. Duplicate or excess payments

If you pay the same invoice twice or pay more than is due, we refund the excess in full or, if you prefer, credit it to your next invoice.

## 9. Chargebacks

Please contact us before raising a payment dispute with your bank or card issuer — most issues can be resolved quickly. If a chargeback is raised for a valid payment, we may suspend the account until it is resolved, and recover any amount found to be owed together with reasonable costs.

## 10. How refunds are paid

Approved refunds are made to the original payment method. We initiate an approved refund within seven working days; banks and card issuers usually take a further five to ten working days. GST charged on refunded fees is reversed and a credit note is issued.

## 11. How to ask

Email {{supportEmail}} from a company administrator's email address, with the company name, order or invoice number, and the reason. We acknowledge requests within two working days and give a decision within ten working days.

${C}, {{address}}. Phone {{phone}}.
`;

/* ================================================================== */
const AUP = `
## 1. Why this policy exists

Oximus Pro watches people at a stressful moment in their working lives. It must be used fairly, lawfully and only for its purpose. This Acceptable Use Policy applies to every company that licenses Oximus Pro, its authorised users, and the Candidates who take rounds on it. It forms part of our [Terms and Conditions](/terms).

## 2. Use it only for assessment and hiring

Oximus Pro may be used only to assess Candidates for jobs, internships, training or admission, and to run the related interviews. It must not be used to monitor employees at work, students outside an assessment, family members, or anyone else.

## 3. Always tell Candidates

You must not monitor anyone who has not been told, before the round, what is monitored and kept. Do not remove, hide or contradict the notice Oximus Pro shows Candidates, and do not tell Candidates something less than is true about the monitoring.

## 4. People decide, fairly

You must not:

- reject, blacklist or penalise a Candidate based only on an automated signal, without a person reviewing the evidence;
- use Oximus Pro to discriminate against anyone on grounds of religion, race, caste, sex, gender identity, sexual orientation, disability, age, place of birth, marital status, pregnancy or any other ground protected by law;
- use signals or pictures to infer health, emotions, personality, religion, caste or other sensitive characteristics;
- refuse reasonable adjustments to a Candidate with a disability or other need where a check would be unfair to them.

## 5. Respect Candidates' data and dignity

You must not:

- publish, post on social media, or circulate outside the hiring process any picture, recording, answer or report about a Candidate;
- use a Candidate's data to shame, threaten, harass or blacklist them across employers;
- download or keep captures longer than your hiring purpose needs, or share them with anyone without a lawful reason;
- record the live video or audio of a round with other software without the Candidate's informed consent;
- invite anyone under 18 without verifiable consent from a parent or lawful guardian as the law requires.

## 6. Protect the service

You must not:

- access or try to access another company's data or account, or share your account;
- probe, scan, load-test or test the security of the service, or bypass any limit or control, without our written permission;
- reverse engineer the service, its detection methods or models, or publish ways to evade them;
- upload malware, or content that is unlawful, infringing, obscene, defamatory or harmful;
- scrape the service or the shared question library, or use it to build a competing product;
- resell, sublicense or provide the service to third parties except to your own Clients as part of your recruitment service.

## 7. Candidates' responsibilities

Candidates must not have another person take a round for them, use unauthorised help or tools, attempt to disable, block or deceive the monitoring, use virtual cameras or screen-hiding software, share their invitation link, or record, copy or publish questions. Breaches will be reported to the company that sent the invitation, which decides the consequences.

## 8. Our brand

Do not use the Oximus or HackGeniX names or logos to suggest that we endorse your decisions, that a Candidate was "caught" or "flagged by Oximus", or that we have certified anyone. Refer to signals as your own review of evidence.

## 9. Enforcement

We may investigate suspected breaches, and may remove content, suspend or end access, and report unlawful activity to the authorities, as our [Terms and Conditions](/terms) allow. To report misuse, write to {{privacyEmail}} or {{supportEmail}}.
`;

/* ================================================================== */
const COOKIES = `
## 1. Summary

**The oximuspro.com website does not use advertising, analytics or tracking cookies, and it does not load third-party trackers.** Fonts and images are served from our own servers. The Oximus Pro application uses one strictly necessary cookie to keep you signed in.

## 2. What we use

| Name or type | Where | Purpose | How long |
|---|---|---|---|
| Sign-in refresh cookie | app.oximuspro.com and the Oximus Pro API | Keeps staff signed in securely. HttpOnly, so scripts cannot read it. | 7 days from your last activity, or until you sign out |
| Session storage: campaign tags | oximuspro.com | Remembers the campaign tag in the link you arrived from (for example utm_source) for the current tab, so an enquiry records how you found us. Not a cookie; cleared when you close the tab. | The browser tab session |
| Session storage: sign-in type | app.oximuspro.com | Remembers whether this tab is a staff, platform or candidate session. | The browser tab session |

Candidate rounds use the camera, microphone and screen-sharing permissions your browser asks you for. These are not cookies, and you can withdraw them in your browser settings at any time; the round may not be able to continue without them.

## 3. Strictly necessary cookies

Strictly necessary cookies are needed for the service to work and are not used to track you. They do not require consent, but you can block them in your browser; if you do, you will not be able to stay signed in.

## 4. Changes

If we ever add analytics or other non-essential cookies, we will update this policy first and ask for your consent where the law requires it.

## 5. Contact

Questions about this policy: {{privacyEmail}}. See also our [Privacy Policy](/privacy-policy).
`;

/* ================================================================== */
const DPA = `
## 1. Scope

This Data Processing Agreement ("DPA") forms part of the [Terms and Conditions](/terms) or the signed agreement (the "Agreement") between ${C} ("HackGeniX", the **Data Processor**) and the company that licenses Oximus Pro (the "Company", the **Data Fiduciary**). It applies whenever HackGeniX processes personal data on the Company's behalf. Terms used here have the meanings given in the Digital Personal Data Protection Act, 2023 ("DPDP Act").

## 2. Details of the processing

- **Subject matter and purpose** — providing Oximus Pro: online assessments, live interviews, interview monitoring, reports and support.
- **Duration** — the term of the Agreement, plus the deletion period in section 10.
- **Data principals** — Candidates invited by the Company, the Company's authorised users, and contacts at the Company's Clients.
- **Personal data** — as listed in section 4 of our [Privacy Policy](/privacy-policy): identity and contact details, identity photographs and documents, webcam and phone-camera pictures, screen pictures around signals, device information, signals and timings, answers, scores, notes and scorecards. No video or audio recordings.
- **Processing** — collection, storage, organisation, display to authorised users, transmission, generation of signals and reports, backup and deletion.

## 3. The Company's responsibilities

The Company decides the purposes and means of processing and is responsible for: giving Candidates a lawful notice and obtaining consent or relying on another lawful ground; the lawfulness of its instructions; configuring monitoring, retention and access appropriately; responding to data principals' requests and grievances about Candidate data; and its own disclosures to Clients.

## 4. HackGeniX's obligations

HackGeniX will:

- process personal data only on the Company's documented instructions — which include the Agreement, this DPA and the Company's configuration of Oximus Pro — unless the law requires otherwise, in which case it will tell the Company first where lawful;
- tell the Company if, in its opinion, an instruction breaches the law;
- ensure that personnel with access are bound by confidentiality and access only what their role needs;
- implement the security measures in section 6;
- not sell personal data, use it for advertising, or use Candidates' answers or images to train AI models;
- assist the Company, taking into account the nature of the processing, in responding to data principals' requests, handling grievances and meeting its obligations on security and breach notification.

## 5. Sub-processors

The Company authorises HackGeniX to engage sub-processors in these categories: cloud hosting and file storage (India), email delivery, video relay (TURN) servers, code execution, payment processing for billing, and — only where the Company switches on AI-drafted follow-up questions — an AI model provider, which receives job and question text but no Candidate personal data. HackGeniX will impose data-protection obligations on each sub-processor no less protective than this DPA and remains responsible for their performance. A current list is available on request. HackGeniX will give at least fifteen days' notice of a new sub-processor of Candidate data; the Company may object on reasonable data-protection grounds, and if the parties cannot resolve the objection, the Company may terminate the affected service and receive a refund of prepaid fees for it.

## 6. Security measures

HackGeniX maintains reasonable security safeguards, including: encryption of data in transit; private storage of pictures, shown through short-lived signed links; logical separation of each company's data; role-based access control within each company; access to production limited to authorised HackGeniX personnel; logging of administrative actions; rotation of sign-in tokens; database backups; and processing of eye movement and answer timing on the Candidate's device so that no eye-tracking video or audio is transmitted.

## 7. Personal data breaches

HackGeniX will notify the Company without undue delay, and in any event within 48 hours, after becoming aware of a personal data breach affecting Company personal data, with the information then available about its nature, likely consequences and the measures taken. It will provide updates as more is known and cooperate with the Company's notifications to the Data Protection Board of India and affected data principals. HackGeniX will report cyber incidents to CERT-In as the law requires.

## 8. Location and transfers

Production data and monitoring captures are stored in India. Personal data may be processed outside India only by sub-processors in the categories above, only to countries not restricted by the Government of India under the DPDP Act, and with appropriate safeguards.

## 9. Audits

On reasonable written request, no more than once a year and with at least thirty days' notice, HackGeniX will provide information reasonably necessary to demonstrate compliance with this DPA, in the first instance through written answers to a security questionnaire and relevant documentation. Any on-site audit must be at the Company's cost, during working hours, subject to confidentiality, and must not access other customers' data.

## 10. Return and deletion

During the term the Company can export its data from Oximus Pro. Monitoring captures are deleted automatically at the end of the retention period the Company sets. Within thirty days after the Agreement ends, HackGeniX will delete the Company's personal data, except where the law requires it to be kept, and will confirm deletion on request. Backups are overwritten in the ordinary course within a further sixty days.

## 11. Liability and precedence

Each party's liability under this DPA is subject to the limitations in the Agreement. If this DPA conflicts with the Agreement on the processing of personal data, this DPA prevails.

## 12. Contact

Data protection queries: {{privacyEmail}} · Grievance Officer: {{grievanceOfficer}}, ${C}, {{address}}.
`;

const page = (slug, title, summary, body, seo) => ({ slug, title, summary, body: body.trim(), seo });

export const LEGAL_PAGES = [
  page('terms', 'Terms and Conditions',
    'How companies may use Oximus Pro. Signals are evidence for your people to review — every hiring decision is yours. A signed order form takes precedence where it differs.',
    TERMS, {
      title: 'Terms and Conditions | Oximus Pro',
      description: 'Terms and conditions for Oximus Pro, the AI interview monitoring and online assessment platform by HackGeniX Tech Private Limited, India.',
      keywords: ['Oximus Pro terms and conditions', 'interview monitoring software terms', 'SaaS terms India'],
    }),
  page('privacy-policy', 'Privacy Policy',
    'We collect what a fair interview needs. We do not record video or audio, run face recognition, sell data or train AI on it, and the hiring company decides how long pictures are kept.',
    PRIVACY, {
      title: 'Privacy Policy | Oximus Pro',
      description: 'What Oximus Pro collects during online interviews and assessments, why, how long it is kept, and your rights under the DPDP Act 2023 and Rules 2025.',
      keywords: ['interview proctoring privacy policy', 'DPDP Act candidate data', 'Oximus Pro privacy'],
    }),
  page('refund-policy', 'Cancellation and Refund Policy',
    'Cancel before activation for a full refund. After activation fees are non-refundable, but no-shows and cancelled rounds never use a credit, and credits lost to our fault come back.',
    REFUND, {
      title: 'Cancellation and Refund Policy | Oximus Pro',
      description: 'How Oximus Pro orders are delivered and cancelled, how credits work, and when refunds are paid. A digital service: nothing is shipped.',
      keywords: ['Oximus Pro refund policy', 'cancellation policy SaaS India', 'delivery policy online service'],
    }),
  page('acceptable-use-policy', 'Acceptable Use Policy',
    'Oximus Pro is for fair, disclosed assessment and hiring only. No secret monitoring, no decisions on a signal alone, no shaming candidates, and no misuse of the service or our brand.',
    AUP, {
      title: 'Acceptable Use Policy | Oximus Pro',
      description: 'How Oximus Pro may and may not be used: disclosed monitoring for hiring only, human decisions, respect for candidates, and protection of the service.',
      keywords: ['acceptable use policy', 'interview monitoring ethics', 'Oximus Pro acceptable use'],
    }),
  page('cookie-policy', 'Cookie Policy',
    'No advertising, analytics or tracking cookies on our website. One strictly necessary cookie keeps you signed in to Oximus Pro.',
    COOKIES, {
      title: 'Cookie Policy | Oximus Pro',
      description: 'The cookies and similar technologies used by oximuspro.com and the Oximus Pro app: no tracking or advertising cookies, one sign-in cookie.',
      keywords: ['Oximus Pro cookie policy', 'cookies'],
    }),
  page('data-processing-agreement', 'Data Processing Agreement',
    'How HackGeniX processes candidate data as your data processor under the DPDP Act: on your instructions only, stored in India, with breach notice within 48 hours.',
    DPA, {
      title: 'Data Processing Agreement (DPA) | Oximus Pro',
      description: 'Oximus Pro data processing agreement: HackGeniX as data processor, the hiring company as data fiduciary under the DPDP Act, security, sub-processors.',
      keywords: ['data processing agreement India', 'DPDP Act data processor', 'Oximus Pro DPA'],
    }),
];
