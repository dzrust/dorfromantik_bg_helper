type Slot = Record<string, string>;
export function variants(base: string, slots: Record<string, Slot>) {
  return (props: Record<string, string | boolean | undefined> = {}) => {
    const parts = [base];
    for (const [name, map] of Object.entries(slots)) {
      const v = props[name];
      if (typeof v === "string" && map[v]) parts.push(map[v]);
      if (v === true && map.true) parts.push(map.true);
    }
    return parts.join(" ");
  };
}
