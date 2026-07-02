module.exports = {
  CREATE_ID_BUTTON_ID: 'create_id_btn',
  CREATE_ID_MODAL_ID: 'create_id_modal',
  SEND_ID_BUTTON_ID: 'send_id_btn',
  CANCEL_ID_BUTTON_ID: 'cancel_id_btn',

  MODAL_FIELD_FULL_NAME: 'full_name',
  MODAL_FIELD_AGE: 'age',
  MODAL_FIELD_CITIZENSHIP: 'citizenship',
  MODAL_FIELD_ROBLOX: 'roblox_username',

  // Panel weryfikacji Roblox -> rola. ID roli/Roblox/kod sa zakodowane
  // wprost w customId (rozdzielone ':'), zeby nie trzymac zadnego stanu
  // po stronie bota - dziala tez po restarcie bota.
  VERIFY_START_PREFIX: 'verify_start',
  VERIFY_MODAL_PREFIX: 'verify_modal',
  VERIFY_CHECK_PREFIX: 'verify_check',
  MODAL_FIELD_VERIFY_ROBLOX: 'verify_roblox_username',

  // Panel egzaminu na Prawo Jazdy RP. Kanal docelowy, numer pytania
  // i dotychczasowy wynik sa zakodowane w customId przyciskow, a dane
  // kandydata (imie, wiek, Roblox) w embedzie wiadomosci - dzieki temu
  // caly wieloetapowy egzamin jest bezstanowy i przetrwa restart bota.
  EXAM_START_PREFIX: 'exam_start',
  EXAM_CATEGORY_PREFIX: 'exam_category',
  EXAM_MODAL_PREFIX: 'exam_modal',
  EXAM_ANSWER_PREFIX: 'exam_ans',
  EXAM_SEND_PREFIX: 'exam_send',

  // Panel rejestracji pojazdu. Wymagana rola sprawdzana jest tylko na
  // starcie (nikt nic nie dostaje), a kanal docelowy jest kodowany w
  // customId dalej, tak jak w pozostalych panelach.
  VEHICLE_START_PREFIX: 'vehicle_start',
  VEHICLE_CATEGORY_PREFIX: 'vehicle_category',
  VEHICLE_MODAL_PREFIX: 'vehicle_modal',
  VEHICLE_SEND_PREFIX: 'vehicle_send',
  MODAL_FIELD_VEHICLE_MAKE: 'vehicle_make',
  MODAL_FIELD_VEHICLE_YEAR: 'vehicle_year',
  MODAL_FIELD_VEHICLE_COLOR: 'vehicle_color',
  MODAL_FIELD_VEHICLE_ENGINE: 'vehicle_engine',
  MODAL_FIELD_VEHICLE_OWNER: 'vehicle_owner',
};
