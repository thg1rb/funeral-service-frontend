export enum BlogCategory {
  KNOWLEDGE = "ความรู้",
  SUGGESTION = "แนะนำ",
  MENTALHEALT = "สุขภาคจิต",
  PET = "สัตว์เลี้ยง"
}

export const map = (text: string) => {
  switch (text) {
    case "ความรู้":
      return BlogCategory.KNOWLEDGE
    case "แนะนำ":
      return BlogCategory.SUGGESTION
    case "สุขภาพจิต":
      return BlogCategory.MENTALHEALT
    case "สัตว์เลี้ยง":
      return BlogCategory.PET
    default:
      break;
  }
}