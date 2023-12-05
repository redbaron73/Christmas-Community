module.exports.momentLocale = 'de'

module.exports.strings = {
  _NOT_LOCALIZED: key => `${key} wurde noch nicht auf Deutsch übersetzt.`,
  ADMIN_CLEAR_WISHLISTS_BUTTON: 'Alle Wunschlisten leeren',
  ADMIN_CLEAR_WISHLISTS_DESCRIPTION: 'Diese Aktion wird sofort und <b>unwiederbringlich alle Wunschlisten leeren!</b> Mache am besten ein Datenbankbackup, bevor Du fortfährst.',
  ADMIN_CLEAR_WISHLISTS_HEADER: 'Wunschlistenleerung',
  ADMIN_SETTINGS_CLEARDB_BUTTON: 'Wunschlisten leeren',
  ADMIN_SETTINGS_CLEARDB_DESCRIPTION: '<b>Warnung</b>: Diese Einstellungen <b>löschen Daten</b>! Mache am besten ein Datenbankbackup, bevor Du fortfährst.',
  ADMIN_SETTINGS_CLEARDB_HEADER: 'Datenlöschung',
  ADMIN_SETTINGS_CLEARDB_SUCCESS: 'Alle Wunschlisten geleert.',
  ADMIN_SETTINGS_HEADER: 'Admin-Einstellungen',
  ADMIN_SETTINGS_USERS_ADD_BUTTON: 'Nutzer hinzufügen',
  ADMIN_SETTINGS_USERS_ADD_HEADER: 'Nutzer hinzufügen',
  ADMIN_SETTINGS_USERS_ADD_PLACEHOLDER: 'john',
  ADMIN_SETTINGS_USERS_ADD_USERNAME: 'Nutzername',
  ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY: 'Der Nutzername darf nicht leer sein.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN: 'Löschen gescheitert: Nutzer ist Admin.',
  ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS: name => `Nutzer ${name} wurde erfolgreich gelöscht`,
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN: 'Nutzer ist kein Admin',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF: 'Du kannst Dich nicht selbst degradieren.',
  ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS: name => `${name} ist nun kein Admin mehr.`,
  ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS: name => `Du bist nun ${name}.`,
  ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED: 'Kein Nutzername angegeben',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN: 'Nutzer ist bereits Admin',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND: 'Nutzer nicht gefunden.',
  ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS: name => `${name} ist nun ein Admin.`,
  ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER: 'Nutzer umbenannt!',
  ADMIN_SETTINGS_USERS_EDIT_SAME_NAME: 'Der alte und neue Nutzername sind identisch.',
  ADMIN_SETTINGS_USERS_EDIT: 'Bearbeiten',
  ADMIN_SETTINGS_USERS_HEADER: 'Nutzer',
  ADMIN_SETTINGS_VERSION_INFO: 'Versionsinfo',
  ADMIN_USER_EDIT_ACCOUNT_UNCONFIRMED: "Dieses Nutzerkonto wurde noch nicht bestätigt.",
  ADMIN_USER_EDIT_ADMIN_ISADMIN: name => `${name} ist ein Admin.`,
  ADMIN_USER_EDIT_ADMIN_NOTADMIN: name => `${name} ist kein Admin.`,
  ADMIN_USER_EDIT_ADMIN: 'Admin',
  ADMIN_USER_EDIT_CHANGE_NAME: 'Namen ändern',
  ADMIN_USER_EDIT_CHANGE_USERNAME: 'Nutzernamen ändern',
  ADMIN_USER_EDIT_CONFIRMATION_LINK: 'Bestätigungslink',
  ADMIN_USER_EDIT_DELETE_ADMIN: 'Nutzer ist Admin',
  ADMIN_USER_EDIT_DELETE_HEADER: 'Unwiderrufliche Löschung',
  ADMIN_USER_EDIT_DELETE_USER: name => `Nutzer ${name} löschen`,
  ADMIN_USER_EDIT_DEMOTE_SELF: 'Du kannst Dir nicht selbst den Admin-Status entziehen.',
  ADMIN_USER_EDIT_DEMOTE: name => `${name} den Admin-Status entziehen`,
  ADMIN_USER_EDIT_EDITING_USER: name => `Nutzer "${name}" wird bearbeitet`,
  ADMIN_USER_EDIT_GENERATE_NEW_LINK: 'Neuen Link generieren',
  ADMIN_USER_EDIT_IMPERSONATE_BUTTON: name => `Als ${name} anmelden`,
  ADMIN_USER_EDIT_IMPERSONATE_HEADER: 'Personifizieren',
  ADMIN_USER_EDIT_LINK_EXPIRY_FUTURE: fromNow => `Der folgende Link läuft ${fromNow} ab`, // fromNow is localized by moment
  ADMIN_USER_EDIT_LINK_EXPIRY_PAST: fromNow => `Der folgende Link ist ${fromNow} abgelaufen`,
  ADMIN_USER_EDIT_PROMOTE: name => `${name} zum Admin machen`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_FUTURE: fromNow => `Läuft ${fromNow} ab`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK_EXPIRY_PAST: fromNow => `Ist ${fromNow} abgelaufen`,
  ADMIN_USER_EDIT_RESET_PASSWORD_HASLINK: 'Es existiert ein Passwortrücksetzlink für diesen Nutzer.',
  ADMIN_USER_EDIT_RESET_PASSWORD_HEADER: 'Passwort zurücksetzen',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CANCEL: 'Passwortrücksetzlink löschen',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_CREATE: 'Passwortrücksetzlink erzeugen',
  ADMIN_USER_EDIT_RESET_PASSWORD_LINK_REFRESH: 'Passwortrücksetzlink erneuern',
  ADMIN_USER_EDIT_USERNAME: 'Nutzername',
  BACK_BUTTON: 'Zurück',
  CONFIRM_ACCOUNT_EXPIRED: 'Dein Bestätigungslink ist abgelaufen. Bitte frage nach einem Neuen.',
  CONFIRM_ACCOUNT_HEADER_INVALID: `${_CC.config.siteTitle} | Ungültiger Bestätigungslink`,
  CONFIRM_ACCOUNT_HEADER_VALID: `${_CC.config.siteTitle} | Nutzerkonto bestätigen`,
  CONFIRM_ACCOUNT_INVALID: "Dieser Bestätigungslink ist ungültig, vielleicht wurde das Konto gelöscht oder es wurden einige Zeichen abgeschnitten?",
  CONFIRM_ACCOUNT_SET_PW_BUTTON: `${_CC.config.siteTitle} beitreten`,
  CONFIRM_ACCOUNT_SET_PW_PLACEHOLDER: 'pa$$word!',
  CONFIRM_ACCOUNT_SET_PW_TEXT: name => `Hallo ${name}! Bitte vergebe hier Dein Passwort.`,
  CONFIRM_ACCOUNT_SUCCESS: `Willkommen bei ${_CC.config.siteTitle}!`,
  LOGIN_BUTTON: 'Anmelden',
  LOGIN_PASSWORD_PLACEHOLDER: 'pa$$word!',
  LOGIN_PASSWORD: 'Passwort',
  LOGIN_USERNAME_PLACEHOLDER: 'john',
  LOGIN_USERNAME: 'Nutzername',
  LOGOUT_BUTTON: 'Abmelden',
  NAVBAR_ADMIN: 'Admin-Einstellungen',
  NAVBAR_LOGIN: 'Anmelden',
  NAVBAR_LOGOUT: 'Abmelden',
  NAVBAR_PROFILE: 'Profil',
  NAVBAR_WISHLIST: 'Meine Wunschliste',
  NOTE_BACK: name => `Zurück zu ${name}s Wunschliste`,
  NOTE_GET_PRODUCT_DATA: 'Produktdaten abrufen',
  NOTE_GUARD: 'Ungültiger Nutzer',
  NOTE_IMAGE_URL: 'Bild-URL',
  NOTE_MISSING_PROP: prop => `Eigenschaft ${prop} fehlt`, // not really possible to localize this unfortunately
  NOTE_NAME: 'Name',
  NOTE_NOTE: 'Bemerkung',
  NOTE_PRICE: 'Preis',
  NOTE_REFRESH_DATA: 'Daten erneuern',
  NOTE_REMOVE_GUARD: 'Ungültiger Nutzer',
  NOTE_REMOVE_MISSING: 'Keine Bemerkung vorhanden',
  NOTE_REMOVE_SUCCESS: 'Bemerkung erfolgreich gelöscht',
  NOTE_SAVE_BUTTON: 'Eintrag speichern',
  NOTE_SUCCESS: 'Erfolgreich gespeichert!',
  NOTE_URL: 'URL',
  PROFILE_HEADER: 'Profil',
  PROFILE_PASSWORD_BUTTON: 'Speichern',
  PROFILE_PASSWORD_NEW: 'Neues Passwort',
  PROFILE_PASSWORD_OLD_MISMATCH: 'Falsches altes Passwort',
  PROFILE_PASSWORD_OLD: 'Altes Passwort',
  PROFILE_PASSWORD_PLACEHOLDER: 'pa$$word!',
  PROFILE_PASSWORD_REQUIRED_NEW: 'Neues Passwort wird benötigt',
  PROFILE_PASSWORD_REQUIRED_OLD: 'Altes Passwort wird benötigt',
  PROFILE_PASSWORD_SUCCESS: 'Passwort erfolgreich geändert!',
  PROFILE_PASSWORD_TITLE: name => `Profileinstellungen - Passwort - ${name}`,
  PROFILE_PFP_IMAGE_URL: 'Bild-URL',
  PROFILE_SAVE_PFP_DISABLED: 'Profilbilder sind deaktiviert.',
  PROFILE_SAVE_PFP_SUCCESS: 'Profilbild gespeichert!',
  PROFILE_SECURITY_CHANGE_PASSWORD: 'Passwort ändern',
  PROFILE_SECURITY: 'Sicherheit',
  PROFILE_TITLE: name => `Profileinstellungen - ${name}`,
  RESET_PASSWORD_BUTTON: 'Passwort zurücksetzen',
  RESET_PASSWORD_GREETING_EXPIRED: 'Dein Rücksetzlink ist abgelaufen. Bitte frage nach einem Neuen.',
  RESET_PASSWORD_GREETING_INVALID: "Dieser Rücksetzlink ist ungültig, vielleicht wurde der Link gelöscht oder es wurden einige Zeichen abgeschnitten?",
  RESET_PASSWORD_GREETING_VALID: name => `Hallo ${name}! Bitte vergebe hier Dein Passwort.`,
  RESET_PASSWORD_HEADER_INVALID: `${_CC.config.siteTitle} | Rücksetzlink ungültig`,
  RESET_PASSWORD_HEADER_VALID: `${_CC.config.siteTitle} | Passwort zurücksetzen`,
  RESET_PASSWORD_PASSWORD_PLACEHOLDER: 'pa$$word!',
  RESET_PASSWORD_PASSWORD: 'Password',
  RESET_PASSWORD_SUCCESS: 'Passwort erfolgreich zurückgesetzt!',
  SETUP_ADMIN_USER: 'Admin-Nutzer',
  SETUP_BUTTON: 'Einrichten!',
  SETUP_HEADER: 'Einrichtung',
  SETUP_PASSWORD_PLACEHOLDER: 'pa$$word!',
  SETUP_PASSWORD: 'Passwort',
  SETUP_USERNAME_PLACEHOLDER: 'john',
  SETUP_USERNAME: 'Nutzername',
  SUPPORTED_SITES_HEADER: 'Unterstützte Seiten',
  SUPPORTED_SITES_TEXT: 'Fehlt eine Seite oder ist etwas defekt? Eröffne <a href="https://github.com/Wingysam/get-product-data/issues/new">hier</a> ein Issue! :)',
  UPDATE_NOTICE: (current, latest) => `
    <span class="has-text-danger is-size-4 has-text-weight-bold">
      Christmas Community ist veraltet. Möglicherweise gibt es neue Funktionen oder Fehler wurden beseitigt. Mach' am besten ein Update! :)
    </span>
    <br>
    <span>(Du kannst diese Nachricht mit <code>UPDATE_CHECK=false</code> abschalten.)</span>
    <br><br>
    <span>Derzeitig: ${current}</span>
    <br>
    <span>Aktuell: ${latest}</span>
    <span class="has-text-info" style="float: right;">Diese Nachricht ist nur für Admins sichtbar</span>`,
  WISHLIST_ADD: 'Eintrag zur Wunschliste hinzufügen',
  WISHLIST_ADDED_BY_USER: addedBy => `Hinzugefügt von: ${addedBy}`,
  WISHLIST_ADDED_BY: 'Hinzugefügt von',
  WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST: 'Eintrag wurde zur Wunschliste hinzugefügt.',
  WISHLIST_CONFLICT: 'Einträge werden zu schnell hinzugefügt. Bitte probier es nocheinmal.',
  WISHLIST_DELETE: 'Löschen',
  WISHLIST_EDIT_ITEM: 'Eintrag bearbeiten',
  WISHLIST_FETCH_FAIL: 'Die Wunschliste konnte nicht abgerufen werden -- existiert der Nutzer?',
  WISHLIST_IMAGE: 'Bild',
  WISHLIST_ITEM_MISSING: 'Eintrag konnte nicht gefunden werden',
  WISHLIST_MOVE_DOWN: 'Runterschieben',
  WISHLIST_MOVE_GUARD: 'Falscher Nutzer',
  WISHLIST_MOVE_INVALID: 'Ungültige Verschiebung',
  WISHLIST_MOVE_ITEM_DOWN: 'Eintrag runterschieben',
  WISHLIST_MOVE_ITEM_TOP: 'Eintrag an den Anfang setzen',
  WISHLIST_MOVE_ITEM_UP: 'Einstrag hochschieben',
  WISHLIST_MOVE_SUCCESS: 'Eintrag erfolgreich verschoben!',
  WISHLIST_MOVE_TOP: 'An den Anfang setzen',
  WISHLIST_MOVE_UNKNOWN_DIRECTION: 'Unbekannte Richtung',
  WISHLIST_MOVE_UP: 'Hochschieben',
  WISHLIST_NAME: 'Name',
  WISHLIST_NOTE: 'Bemerkung',
  WISHLIST_OPTIONAL: 'Optional',
  WISHLIST_PLEDGE_DUPLICATE: 'Eintrag ist bereits reserviert',
  WISHLIST_PLEDGE_ITEM: 'Reservieren',
  WISHLIST_PLEDGE_SUCCESS: 'Eintrag erfolgreich reserviert!',
  WISHLIST_PLEDGE: 'Reservieren',
  WISHLIST_PLEDGED: pledgedBy => `Reserviert von ${pledgedBy}`,
  WISHLIST_PLEDGED_GUEST: 'Reserviert von einem Gastnutzer',
  WISHLIST_PLEDGED_ITEM_FOR_USER: user => `Eintrag reserviert für ${user}.`,
  WISHLIST_PRICE: 'Preis',
  WISHLIST_REFRESH_GUARD: 'Ungültiger Nutzer',
  WISHLIST_REFRESH_NO_URL: 'Eintrag hat keine URL.',
  WISHLIST_REFRESH_SUCCESS: 'Daten erfolgreich erneuert!',
  WISHLIST_REMOVE_GUARD: 'Falscher Nutzer',
  WISHLIST_REMOVE_SUCCESS: 'Erfolgreich von der Wunschliste entfernt',
  WISHLIST_SUGGEST: 'Eintrag vorschlagen',
  WISHLIST_TITLE: name => `${_CC.config.siteTitle} - Wunschliste - ${name}`,
  WISHLIST_UNPLEDGE_GUARD: 'Du hast das nicht reserviert', // should never happen unless someone makes their own http requests
  WISHLIST_UNPLEDGE_SUCCESS: 'Reservierung erfolgreich aufgehoben!',
  WISHLIST_UNPLEDGE: 'Reservierung aufheben',
  WISHLIST_URL_LABEL: `URL oder Name (<a href="${_CC.config.base}supported-sites">Unterstützte Seiten</a>)`,
  WISHLIST_URL_PLACEHOLDER: 'https://www.amazon.com/dp/B00ZV9RDKK',
  WISHLIST_URL_REQUIRED: 'URL oder Name wird benötigt',
  WISHLISTS_COUNTS_SELF: name => `${name}: ???/???`,
  WISHLISTS_COUNTS: (name, pledged, total) => `${name}: ${pledged}/${total}`,
  WISHLISTS_TITLE: `${_CC.config.siteTitle} - Wunschlisten`
}
