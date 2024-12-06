export const PRIORITY_REGEX = /\((A|B|C)\)/g
export const CONTEXT_REGEX = /\@\w+/g
export const PROJECT_REGEX = /\+\w+/g
export const DUE_REGEX = /due:(\d{4}-\d{2}-\d{2})/

export function getPrettyText(text) {
  return text
    .replace(PRIORITY_REGEX, `<span class="font-bold text-yellow-500">$&</span>`)
    .replace(CONTEXT_REGEX, `<span class="font-bold text-green-500">$&</span>`)
    .replace(PROJECT_REGEX, `<span class="font-bold text-red-500">$&</span>`)
    .replace(DUE_REGEX, `<span class="font-bold text-blue-500">$&</span>`)
    .replace(/\n/g, '<br>')
}
