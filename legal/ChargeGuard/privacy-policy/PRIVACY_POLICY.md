# ChargeGuard Privacy Policy

**Effective date:** November 17, 2026  
**App version:** 1.6.5  
**Package:** `com.projectw.chargeguard`  
**Developer / privacy contact:** ProjectW (Waqas) · [wetheprojectw@gmail.com](mailto:wetheprojectw@gmail.com)

## 1. Overview

ChargeGuard is an Android battery-monitoring utility. During ordinary app operation, battery information and app settings are processed on your device. ChargeGuard does not send battery telemetry, settings, or charging history to a developer-operated server. The app does not create user accounts.

“Local processing” does not mean zero battery use. Background monitoring uses some device power while active; actual use varies by phone, Android version, settings, and how long monitoring is enabled.

## 2. Information processed on your device

- **Battery and charging readings:** charge level and state, temperature, voltage, current, estimated charging time, charging source/power, and cycle information when Android provides it. These readings are used locally for the dashboard, widget, target-charge alerts, unplug protection, temperature warnings, and charging analysis.
- **Settings:** target charge level, monitoring and alert choices, quiet hours, schedule, theme, alarm volume, selected sound, and related preferences. They are stored in app-private Android storage using Jetpack DataStore.
- **Charging-session history:** local summaries may include start/end charge level, duration, average/maximum power, maximum temperature, and the session end condition. The app keeps at most 100 entries and removes older entries as new ones are saved.
- **Custom alarm sound:** if you choose an audio file through Android's document picker, the app stores the granted file reference and reads that file locally for alarm playback. The app does not scan your audio library.
- **Support email:** if you email us, we receive your email address and the message or attachments you choose to send. We use them to answer your request and manage follow-up. The Gmail/email service may process that correspondence under its own terms. Please do not email sensitive information.

ChargeGuard does not request access to your location, contacts, microphone, or camera. The optional flashlight alert uses the device flash; it does not record images or video.

## 3. Background monitoring and battery use

When monitoring is enabled and the device is charging, ChargeGuard may run an Android foreground service with an ongoing notification. It reads battery state in the background to provide the monitoring and alerts you enabled. If an unplug alarm is triggered, the service can remain active while that alarm is sounding; when monitoring is no longer needed and no alarm is active, the service stops to reduce idle use.

If you enable low-battery alerts, Android WorkManager schedules periodic checks. Android controls when background work runs and may defer it. Widgets also refresh periodically. These checks are not a promise of continuous second-by-second monitoring while the phone is unplugged.

Continuous monitoring cannot use literally zero energy. ChargeGuard is designed to limit idle activity, but power consumption is nonzero while monitoring is active. Android, battery-saver settings, manufacturer background restrictions, denied permissions, a force-stop, a powered-off device, or other system conditions may delay or prevent background work. Therefore ChargeGuard cannot guarantee uninterrupted operation on every device or launcher. Keep monitoring enabled and allow the required notifications/background operation for the best chance of timely alerts.

## 4. Android permissions and system features

- **`POST_NOTIFICATIONS`:** show the ongoing monitoring notification and alerts where Android requires notification permission.
- **`FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_SPECIAL_USE`:** run the user-enabled monitoring service with an ongoing notification while the service is needed.
- **`VIBRATE` and `WAKE_LOCK`:** support vibration and audible alerts when the screen is off.
- **`RECEIVE_BOOT_COMPLETED`:** restore eligible monitoring listeners and scheduled checks after restart, subject to your settings and Android restrictions.
- **Android system document picker:** lets you choose an alarm sound or a destination for an optional CSV export. Exports are saved to the location you select; the app does not request broad storage access.
- **Optional camera-flash hardware feature:** can flash a light alert when enabled. No camera permission is requested and no camera recording occurs.

## 5. Network, sharing, and third parties

- The app does not request the Android Internet permission and does not upload app telemetry or local history to a ChargeGuard server.
- The current app source does not include advertising or analytics features. We do not sell or rent your app data.
- Android provides system services used for notifications, battery readings, background scheduling, and the file picker. These platform services are governed by their providers' own terms and privacy notices.
- If you email support, your message is handled by your email provider and the provider of the support mailbox. Email may be stored or routed outside your country under those providers' terms.
- If you export a CSV, the file is written to the destination you select. That destination and any later sharing are under your control.

## 6. Legal basis where required

Where the GDPR applies, the intended legal basis for local battery readings and settings that are necessary to provide the ChargeGuard features you request is performance of the service/contract (GDPR Article 6(1)(b)). For optional features where consent is the appropriate legal basis, we rely on your consent (Article 6(1)(a)); you can withdraw it by disabling the feature or permission, without affecting earlier processing. Support correspondence is used to answer your request. ChargeGuard does not use battery information for advertising or profiling.

For users in the European Economic Area or United Kingdom, you may also complain to the data-protection supervisory authority in the place where you live, work, or believe an infringement occurred.

## 7. Retention, security, and deletion

App settings remain in app-private storage until you change or reset them or uninstall ChargeGuard. Charging history is stored locally, capped at 100 entries, and can be cleared from the app. Custom-sound access remains only while the saved file permission is available. Android backup and device-transfer rules exclude the app's settings and DataStore history.

Local app data is kept within Android's app-private storage. No copy of battery telemetry or app history is kept on a ChargeGuard server. Protecting the device itself with Android screen-lock and security settings helps protect locally stored information. The app does not independently encrypt these local files.

Support emails are retained in the support mailbox only as long as needed to reply and handle follow-up, unless a longer period is required by law. You can request deletion of a support conversation by emailing us.

## 8. Your choices and privacy rights

You can turn monitoring and optional alerts on or off in the app, change or clear settings, clear session history, revoke Android permissions in system settings, or uninstall the app. Because battery readings and settings are stored locally and are not available to us remotely, you manage or delete that app data on your device.

Depending on your location and applicable law, you may also have rights to request access, correction, deletion, restriction, or portability of personal data, to object to certain processing, or to withdraw consent where processing relies on consent. Contact [wetheprojectw@gmail.com](mailto:wetheprojectw@gmail.com) for privacy questions or requests. These rights are subject to applicable law.

## 9. Children's privacy

ChargeGuard is a general-purpose battery utility and is not designed to collect personal information from children. The app does not create child accounts or send children's battery information to us.

## 10. Changes to this policy

If the app's data practices change, this policy will be updated. The effective date above identifies the current revision.

## 11. Contact

**ProjectW (Waqas)**  
Email: [wetheprojectw@gmail.com](mailto:wetheprojectw@gmail.com)

---

## Publishing checklist (not part of the policy text)

- `docs/privacy-policy/index.html` is the self-contained page to publish with GitHub Pages from the repository's `docs/` folder. The live URL has not been inserted into the app because the owner-controlled GitHub URL has not been supplied yet.
- Confirm that **ProjectW (Waqas)** matches the developer identity shown in your Google Play listing; replace it with the exact legal publisher name and required contact details if not.
- Confirm the stated legal bases for each country where the app will be offered. This document is a careful draft, not a lawyer's certification.
- Verify the final merged release manifest and SDKs once the KSP dependency/build issue is resolved, and complete the separate Google Play Data Safety form consistently with the release.
