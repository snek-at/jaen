import {PluginOptions as GenericPluginOptions} from 'gatsby'

export interface PluginOptions extends GenericPluginOptions {
  templatePath: string
}
