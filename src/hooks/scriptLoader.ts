export default function scriptLoader(scriptSrc: string, options?: ScriptLoadOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = scriptSrc
    script.async = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(new Error(`Could not load script: "${scriptSrc}"`, { cause: error }))
    Object.entries(options?.attributes ?? {}).forEach(([k, v]) => script.setAttribute(k, v))
    if (options?.position === "head") {
      document.head.appendChild(script)
    } else {
      document.body.appendChild(script)
    }
  })
}

/**
 * @group Types
 */
export type ScriptLoadOptions = {
  /**
   * Indicates the position of the script, default is "body"
   */
  position?: "head" | "body"
  /**
   * Indicates the attributes of the script element
   */
  attributes?: Record<string, string>
}
