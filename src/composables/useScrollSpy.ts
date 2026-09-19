import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          activeId.value = visible.target.id
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer?.observe(section))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { activeId }
}
