# AGENTS.md - AI Assistant Context

<ai_context version="1.0" audience="coding-agent">

<meta>
  <project_name>lys-lf-react-19</project_name>
  <description>Law firm website for LYS Law Firm</description>
  <primary_goal>Maintain a statically-exportable professional law firm website</primary_goal>
  <assumed_agent_capabilities>Edit TS/TSX/CSS/SCSS files, run pnpm commands, understand Next.js App Router</assumed_agent_capabilities>
</meta>

<reading_order>
  <section_ref id="mission"/>
  <section_ref id="critical_rules"/>
  <section_ref id="architecture"/>
  <section_ref id="coding_standards"/>
  <section_ref id="data_layer"/>
  <section_ref id="build_deploy"/>
  <section_ref id="known_issues"/>
</reading_order>

<mission id="mission" priority="high">
  <overview>
    LYS Law Firm website built with Next.js 15+ and React 19. Single-page marketing site
    showcasing team members, practice areas, and contact information. All content is static
    and pre-rendered at build time for deployment to any static hosting provider.
  </overview>
  <non_goals>
    <item>Server-side rendering or dynamic content</item>
    <item>User authentication or accounts</item>
    <item>Database connections or API integrations</item>
    <item>E-commerce or payment processing</item>
  </non_goals>
</mission>

<critical_rules id="critical_rules" priority="critical" enforce="must_follow">

  <constraints_group id="static_export" title="Static Export Rules" priority="critical">
    <constraint id="se1" severity="critical" 
                rationale="Project uses output: 'export' in next.config.ts for static hosting"
                verification="pnpm build must succeed and produce /out directory">
      All pages must be pre-renderable at build time as static HTML/CSS/JS
    </constraint>
    <constraint id="se2" severity="critical"
                rationale="Static export cannot execute server code"
                verification="No imports from 'server-only' or use of server actions">
      No server-side code paths allowed
    </constraint>
    <constraint id="se3" severity="critical"
                rationale="Static hosting has no Node.js runtime"
                verification="Build succeeds with output: 'export'">
      No runtime server features - all routes known at build time
    </constraint>
  </constraints_group>

  <constraints_group id="client_components" title="Client Component Rules" priority="high">
    <constraint id="cc1" severity="high"
                rationale="React hooks require client-side execution"
                verification="Components with useState/useEffect have 'use client' directive">
      Components using hooks (useState, useEffect, etc.) MUST have 'use client' directive
    </constraint>
    <constraint id="cc2" severity="high"
                rationale="Hydration errors occur when server/client render differently"
                verification="No hydration warnings in browser console">
      Client-only logic (random values, window access) must be in useEffect
    </constraint>
  </constraints_group>

  <constraints_group id="images" title="Image Handling" priority="medium">
    <constraint id="img1" severity="medium"
                rationale="images.unoptimized: true is set for static hosting compatibility"
                verification="Images load correctly in production build">
      next/image provides no optimization benefit - standard img tags are equivalent
    </constraint>
  </constraints_group>

  <stop_signs priority="critical">
    <do_not_rules enforce="absolute" visibility="max">
      
      <do_not id="dn1" severity="critical">
        <rule>Do NOT add API routes (app/api/)</rule>
        <because>Static export cannot serve API endpoints</because>
        <instead>Use static data in app/assets/data/</instead>
      </do_not>

      <do_not id="dn2" severity="critical">
        <rule>Do NOT use server actions ('use server')</rule>
        <because>No server runtime exists in production</because>
        <instead>Handle all logic client-side or at build time</instead>
      </do_not>

      <do_not id="dn3" severity="critical">
        <rule>Do NOT use getServerSideProps patterns</rule>
        <because>Incompatible with static export</because>
        <instead>Import data directly from app/assets/data/</instead>
      </do_not>

      <do_not id="dn4" severity="critical">
        <rule>Do NOT remove output: 'export' from next.config.ts</rule>
        <because>Entire deployment strategy depends on static export</because>
        <instead>Work within static export constraints</instead>
      </do_not>

      <do_not id="dn5" severity="critical">
        <rule>Do NOT assume Node.js runtime availability in production</rule>
        <because>Site deploys to static hosting (Apache/Nginx/CDN)</because>
        <instead>All dynamic behavior must be client-side JavaScript</instead>
      </do_not>

      <do_not id="dn6" severity="high">
        <rule>Do NOT use dynamic server-side data fetching</rule>
        <because>No server to fetch data at request time</because>
        <instead>All data must be available at build time</instead>
      </do_not>

    </do_not_rules>
  </stop_signs>

</critical_rules>

<architecture id="architecture" priority="high">

  <tech_stack>
    <item name="Next.js" version="15+" note="App Router, Static Export"/>
    <item name="React" version="19.x"/>
    <item name="TypeScript" version="5.x"/>
    <item name="Tailwind CSS" version="4"/>
    <item name="SCSS" note="Legacy, prefer Tailwind for new code"/>
    <item name="Package Manager" value="pnpm" note="Use pnpm-lock.yaml, ignore package-lock.json"/>
  </tech_stack>

  <project_structure>
    <path role="app_root" description="Next.js App Router root">app/</path>
    <path role="data" description="Static data files (team, config, content)">app/assets/data/</path>
    <path role="components" description="React components">app/components/</path>
    <path role="styles" description="Global CSS and SCSS">app/styles/</path>
    <path role="types" description="TypeScript interfaces">app/types/</path>
    <path role="public_assets" description="Static images">public/images/</path>
    <path role="optimized_images" description="WebP optimized images">public/images/optimized/</path>
    <path role="build_scripts" description="Build utilities">scripts/</path>
    <notes>
      - layout.tsx: Root layout with metadata
      - page.tsx: Home page (single-page site)
      - All routes are known at build time
    </notes>
  </project_structure>

  <design_principles>
    <principle id="p1" priority="high">
      <text>Single Responsibility: Data, types, and components are separated</text>
    </principle>
    <principle id="p2" priority="high">
      <text>Open/Closed: Add team members or practice areas without modifying components</text>
    </principle>
    <principle id="p3" priority="medium">
      <text>DRY: Centralized configuration in data/ folder</text>
    </principle>
    <principle id="p4" priority="medium">
      <text>Prefer existing patterns over introducing new abstractions</text>
    </principle>
  </design_principles>

</architecture>

<coding_standards id="coding_standards" priority="high">

  <component_guidelines>
    <rule id="cg1" priority="high">
      <text>Components WITH hooks need 'use client' directive at top of file</text>
    </rule>
    <rule id="cg2" priority="high">
      <text>Components WITHOUT hooks can be server components (default, no directive needed)</text>
    </rule>
    <rule id="cg3" priority="medium">
      <text>Pure presentational components should use React.memo for optimization</text>
    </rule>

    <current_client_components note="These require 'use client'">
      <component file="header.tsx" reason="useState/useEffect for background randomization"/>
      <component file="map.tsx" reason="useEffect for Google Maps initialization"/>
    </current_client_components>

    <examples>
      <example id="client_component" language="tsx">
        <good>
```tsx
'use client'
import { useState, useEffect } from 'react'

export function InteractiveComponent() {
  const [value, setValue] = useState(null)
  
  useEffect(() => {
    // Client-only logic here (window, random, etc.)
  }, [])
  
  return <div>...</div>
}
```
        </good>
        <bad>
```tsx
// Missing 'use client' directive!
import { useState } from 'react'

export function BrokenComponent() {
  const [value, setValue] = useState(null) // Will cause build error
  return <div>...</div>
}
```
        </bad>
      </example>

      <example id="server_component" language="tsx">
        <good>
```tsx
// No directive needed - server component by default
import { someData } from '@/app/assets/data/some-data'

export function StaticComponent() {
  return <div>{someData.title}</div>
}
```
        </good>
      </example>
    </examples>
  </component_guidelines>

  <styling_conventions>
    <rule id="sc1" priority="high">
      <text>Primary styling: Tailwind CSS utility classes</text>
    </rule>
    <rule id="sc2" priority="high">
      <text>Custom colors: Use lys-* tokens defined in tailwind.config.js</text>
    </rule>
    <rule id="sc3" priority="medium">
      <text>Fonts: font-noticia (Noticia Text), font-lato (Lato)</text>
    </rule>
    <rule id="sc4" priority="low">
      <text>Legacy SCSS in index.scss - prefer Tailwind for new code</text>
    </rule>
  </styling_conventions>

</coding_standards>

<data_layer id="data_layer" priority="high">

  <sources>
    <source id="static_ts" type="static" location="app/assets/data/" priority="high">
      All content is static TypeScript files imported at build time
    </source>
  </sources>

  <data_files>
    <file name="site-config.ts" purpose="Site metadata, contact info, social links"/>
    <file name="business-profile.ts" purpose="Company description and about content"/>
    <file name="team.ts" purpose="Team member profiles (partners, associates)"/>
    <file name="practice-areas.ts" purpose="Legal practice areas and services"/>
  </data_files>

  <data_contracts>
    <type name="Employee" location="app/types/index.ts"/>
    <type name="SiteConfig" location="app/types/index.ts"/>
    <type name="PracticeArea" location="app/types/index.ts"/>
  </data_contracts>

  <usage_rules>
    <rule id="dr1" priority="high">
      <text>All data must be serializable and available at build time</text>
    </rule>
    <rule id="dr2" priority="high">
      <text>To add content, edit the appropriate data file - no component changes needed</text>
    </rule>
    <rule id="dr3" priority="medium">
      <text>Types are centralized in app/types/index.ts</text>
    </rule>
  </usage_rules>

</data_layer>

<build_deploy id="build_deploy" priority="high">

  <commands>
    <command id="install" priority="high">
      <run>pnpm install</run>
      <note>Use pnpm, not npm</note>
    </command>
    <command id="dev" priority="medium">
      <run>pnpm dev</run>
      <note>Development server at localhost:3000</note>
    </command>
    <command id="build" priority="critical">
      <run>pnpm build</run>
      <note>Creates static export in out/ directory</note>
    </command>
    <command id="preview" priority="medium">
      <run>pnpm start</run>
      <note>Preview production build</note>
    </command>
  </commands>

  <deployment>
    <output_directory>out/</output_directory>
    <compatible_hosts>
      <host>Netlify</host>
      <host>Vercel (static)</host>
      <host>Apache</host>
      <host>Nginx</host>
      <host>Any static file host</host>
    </compatible_hosts>
    <note>Upload contents of out/ folder - no Node.js runtime required</note>
  </deployment>

  <verification_checklist priority="high">
    <check id="v1"><text>pnpm build succeeds without errors</text></check>
    <check id="v2"><text>out/ directory is generated</text></check>
    <check id="v3"><text>No hydration warnings in browser console</text></check>
    <check id="v4"><text>All images load correctly</text></check>
    <check id="v5"><text>No TypeScript errors (pnpm tsc --noEmit)</text></check>
  </verification_checklist>

</build_deploy>

<known_issues id="known_issues" priority="medium">
  <resolved_issues note="All critical issues have been fixed">
    <issue id="ki1" status="resolved" area="types">
      <was>Type inconsistency: Employee.pic vs Employee.img</was>
      <fix>Standardized to Employee.img</fix>
    </issue>
    <issue id="ki2" status="resolved" area="hydration">
      <was>Header hydration mismatch from random background selection</was>
      <fix>Uses useEffect for client-side only randomization</fix>
    </issue>
    <issue id="ki3" status="resolved" area="build">
      <was>Missing 'use client' directives</was>
      <fix>Added to header.tsx, map.tsx, profile.tsx</fix>
    </issue>
    <issue id="ki4" status="resolved" area="content">
      <was>Grammar issues in business-profile.ts</was>
      <fix>Content corrections applied</fix>
    </issue>
    <issue id="ki5" status="resolved" area="performance">
      <was>Missing memoization on pure components</was>
      <fix>All pure components now use React.memo</fix>
    </issue>
    <issue id="ki6" status="resolved" area="accessibility">
      <was>Multiple h1 tags in header</was>
      <fix>Changed to proper heading hierarchy</fix>
    </issue>
  </resolved_issues>
  
  <current_notes>
    <note id="n1" area="images">
      images.unoptimized: true means next/image provides no benefit over standard img tags.
      This is intentional for static export compatibility.
    </note>
  </current_notes>
</known_issues>

<change_policy priority="high">
  <preferred_patterns>
    <pattern id="pp1"><text>Edit data files to update content (no component changes needed)</text></pattern>
    <pattern id="pp2"><text>Use Tailwind utilities for styling</text></pattern>
    <pattern id="pp3"><text>Follow existing component patterns</text></pattern>
    <pattern id="pp4"><text>Keep components small and focused</text></pattern>
  </preferred_patterns>
  <avoid_patterns>
    <pattern id="ap1"><text>Adding new dependencies without justification</text></pattern>
    <pattern id="ap2"><text>Large refactors - prefer incremental changes</text></pattern>
    <pattern id="ap3"><text>Server-side patterns (will break static export)</text></pattern>
  </avoid_patterns>
</change_policy>

</ai_context>
