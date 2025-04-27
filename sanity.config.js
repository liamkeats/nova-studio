import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Nova Detailing',
  projectId: 'ht94ubie',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Deploy Nova Detailing Site',
          sites: [
            {
              title: 'Live Site',
              apiId: '9e452c67-8cff-4f71-9ced-f27936d52cdc',
              buildHookId: '6809aad6bd93041bf4772164',
              name: 'ubiquitous-cheesecake-f7f10b',
              url: 'https://thenovadetailing.ca'
            }
          ]
        })
      ]
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
