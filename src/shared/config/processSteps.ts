export interface ProcessStep {
  /** i18n key for the step title, under `processSection.steps` */
  titleKey: string;
  /** i18n key for the step description, under `processSection.steps` */
  descriptionKey: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    titleKey: 'processSection.steps.consultation.title',
    descriptionKey: 'processSection.steps.consultation.description',
  },
  {
    titleKey: 'processSection.steps.design.title',
    descriptionKey: 'processSection.steps.design.description',
  },
  {
    titleKey: 'processSection.steps.crafting.title',
    descriptionKey: 'processSection.steps.crafting.description',
  },
  {
    titleKey: 'processSection.steps.delivery.title',
    descriptionKey: 'processSection.steps.delivery.description',
  },
];
