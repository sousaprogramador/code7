import { dateConvert } from 'helpers/dateConvert';

export function dataObject(userId, dados, medData) {
  return {
    patient_id: userId,
    symptoms: dados.symptoms.filter((item) => item.checked),
    conditions: dados.conditions.filter((item) => item.checked),
    consultations: [
      {
        id: dados.secondConsultId || null,
        date: dados.secondConsultDat || null,
        consultation_unit_id: dados.secondConsultUnit || null,
      },
      {
        id: dados.firsConsultId || null,
        date: dados.firsConsultDat || null,
        consultation_unit_id: dados.firsConsultUnit || null,
      },
    ],
    quick_test: {
      collection_date: dados.fastTestDate || null,
      result: dados.fastTestResult || null,
      test_id: dados.fastTest || null,
    },
    swab: {
      collection_date: dados.swabDate || null,
      result: dados.swabResult || null,
      result_date: dados.swabResultDate || null,
    },
    elisa: {
      collection_date: dados.elisaDate || null,
      result: dados.elisaResult,
      result_date: dados.elisaResultDate || null,
    },
    eclia: {
      collection_date: dados.ecliaDate || null,
      result: dados.ecliaResult || null,
      result_date: dados.ecliaResultDate || null,
    },
    ecg: {
      date: dados.dateEcg || null,
      qtc: dados.qtc || null,
    },
    medicines: medData.filter((item) => item.checked),
    hospitalizations: [
      {
        id: dados.firstInternId || null,
        date: dados.firstInternDate || null,
        hospitalization_unit_id: dados.firstInternUnit || null,
      },
      {
        id: dados.secondInternId || null,
        date: dados.secondInternDate || null,
        hospitalization_unit_id: dados.secondInternUnit || null,
      },
    ],
    uti: {
      entry_date: dados.utiDateEnter || null,
      exit_date: dados.utiDateExit || null,
    },
    x_ray: {
      type: dados.xRay || null,
      date: dados.xRayDate || null,
    },
    ventilatory_support: {
      type: dados.ventSupport || null,
    },
    note: dados.note || null,
    case_evolution: {
      result_date: dados.closingDate || null,
      criterion_closing_id: dados.criterionClosing || null,
      final_class_id: dados.finalClass || null,
      evolution_result_id: dados.caseEvolution || null,
    },
  };
}

export function consultData(consult) {
  return {
    fastTest: consult.quick_test ? consult.quick_test.test.id : '',
    fastTestResult: consult.quick_test ? consult.quick_test.result : '',
    fastTestDate: consult.quick_test
      ? dateConvert(consult.quick_test.collection_date)
      : '',
    firsConsultUnit: consult.consultation[0]
      ? consult.consultation[0].consultation_unit_id
      : '',
    firsConsultId: consult.consultation[0] ? consult.consultation[0].id : '',
    firsConsultDat: consult.consultation[0]
      ? dateConvert(consult.consultation[0].date)
      : '',
    secondConsultUnit: consult.consultation[1]
      ? consult.consultation[1].consultation_unit_id
      : '',
    secondConsultId: consult.consultation[1] ? consult.consultation[1].id : '',
    secondConsultDat: consult.consultation[1]
      ? dateConvert(consult.consultation[1].date)
      : '',
    firstInternUnit: consult.hospitalization[0]
      ? consult.hospitalization[0].hospitalization_unit_id
      : '',
    firstInternId: consult.hospitalization[0]
      ? consult.hospitalization[0].id
      : '',
    firstInternDate: consult.hospitalization[0]
      ? dateConvert(consult.hospitalization[0].date)
      : '',
    secondInternUnit: consult.hospitalization[1]
      ? consult.hospitalization[1].hospitalization_unit_id
      : '',
    secondInternId: consult.hospitalization[1]
      ? consult.hospitalization[1].id
      : '',
    secondInternDate: consult.hospitalization[1]
      ? dateConvert(consult.hospitalization[1].date)
      : '',
    swabDate: dateConvert(consult.swab ? consult.swab.collection_date : ''),
    swabResult: consult.swab ? consult.swab.result : '',
    swabResultDate: dateConvert(consult.swab ? consult.swab.result_date : ''),
    elisaDate: dateConvert(consult.elisa ? consult.elisa.collection_date : ''),
    elisaResult: consult.elisa ? consult.elisa.result : '',
    elisaResultDate: dateConvert(
      consult.elisa ? consult.elisa.result_date : '',
    ),
    ecliaDate: dateConvert(consult.eclia ? consult.eclia.collection_date : ''),
    ecliaResult: consult.eclia ? consult.eclia.result : '',
    ecliaResultDate: dateConvert(
      consult.eclia ? consult.eclia.result_date : '',
    ),
    dateEcg: dateConvert(consult.ecg ? consult.ecg.date : ''),
    qtc: consult.ecg ? consult.ecg.qtc : '',
    utiDateEnter: dateConvert(consult.uti ? consult.uti.entry_date : ''),
    utiDateExit: dateConvert(consult.uti ? consult.uti.exit_date : ''),
    ventSupport: consult.ventilatory_support
      ? consult.ventilatory_support.type
      : '',
    xRay: consult.x_ray ? consult.x_ray.type : '',
    xRayDate: dateConvert(consult.x_ray ? consult.x_ray.date : ''),
    caseEvolution: consult.case_evolution
      ? consult.case_evolution.evolution_result_id
      : '',
    finalClass: consult.case_evolution
      ? consult.case_evolution.final_class_id
      : '',
    criterionClosing: consult.case_evolution
      ? consult.case_evolution.criterion_closing_id
      : '',
    closingDate: dateConvert(
      consult.case_evolution ? consult.case_evolution.result_date : '',
    ),
    note: consult.note || '',
  };
}

export function validate(dados, handleValidate, handleSave) {
  if (dados.firsConsultUnit && !dados.firsConsultDat) {
    handleValidate('2', 'Prencha a data da 1° consulta');
  } else if (dados.firsConsultDat && !dados.firsConsultUnit) {
    handleValidate('2', 'Prencha a unidade da 1° consulta');
  } else if (dados.secondConsultUnit && !dados.secondConsultDat) {
    handleValidate('2', 'Prencha a data da 2° consulta');
  } else if (dados.secondConsultDat && !dados.secondConsultUnit) {
    handleValidate('2', 'Prencha a unidade da 2° consulta');
  } else if (dados.fastTest && !dados.fastTestDate) {
    handleValidate('2', 'Prencha a data do teste rápido');
  } else if ((dados.fastTestResult || dados.fastTestDate) && !dados.fastTest) {
    handleValidate('2', 'Escolha o tipo do teste rápido');
  } else if (dados.fastTest && !dados.fastTestResult) {
    handleValidate('2', 'Prencha o resultado do teste rápido');
  } else if (dados.swabResult && !dados.swabDate) {
    handleValidate('2', 'Prencha a data de coleta Swab');
  } else if (dados.swabDate && !dados.swabResult) {
    handleValidate('2', 'Prencha o resultado do Swab');
  } else if (
    dados.swabResult &&
    dados.swabResult !== 'Aguardando' &&
    !dados.swabResultDate
  ) {
    handleValidate('2', 'Prencha a data do resultado Swab');
  } else if (dados.elisaResult && !dados.elisaDate) {
    handleValidate('2', 'Prencha a data Elisa');
  } else if (dados.elisaDate && !dados.elisaResult) {
    handleValidate('2', 'Prencha o resultado Elisa');
  } else if (
    dados.elisaResult &&
    dados.elisaResult !== 'Aguardando' &&
    !dados.elisaResultDate
  ) {
    handleValidate('2', 'Prencha a data do resultado Elisa');
  } else if (dados.ecliaResult && !dados.ecliaDate) {
    handleValidate('2', 'Prencha a data Eclia ');
  } else if (dados.ecliaDate && !dados.ecliaResult) {
    handleValidate('2', 'Prencha o resultado do Eclia');
  } else if (
    dados.ecliaResult &&
    dados.ecliaResult !== 'Aguardando' &&
    !dados.ecliaResultDate
  ) {
    handleValidate('2', 'Prencha a data do resultado Eclia ');
  } else if (dados.firstInternUnit && !dados.firstInternDate) {
    handleValidate('3', 'Prencha o a data da 1° internação');
  } else if (dados.firstInternDate && !dados.firstInternUnit) {
    handleValidate('3', 'Prencha o a unidade da 1° internação');
  } else if (dados.secondInternUnit && !dados.secondInternDate) {
    handleValidate('3', 'Prencha o a data da 2° internação');
  } else if (dados.secondInternDate && !dados.secondInternUnit) {
    handleValidate('3', 'Prencha o a unidade da 2° internação');
  } else if (dados.xRayDate && !dados.xRay) {
    handleValidate('3', 'Prencha o tipo raio-x torax');
  } else if (dados.xRay && !dados.xRayDate) {
    handleValidate('3', 'Prencha a data raio-x torax');
  } else if (dados.closingDate && !dados.criterionClosing) {
    handleValidate('3', 'Prencha o cretério de encerramento');
  } else if (dados.criterionClosing && !dados.closingDate) {
    handleValidate('3', 'Prencha a data de encerramento');
  } else {
    handleSave();
  }
}
