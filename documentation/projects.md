# Projects Page Migration: From Strapi API to Local JSON

## 🚨 **The Problem**

### **Error Encountered**
```
Failed to parse URL from /projects.json
TypeError: Failed to parse URL from /projects.json
    at node:internal/deps/undici/undici:13510:13
```

### **Root Cause**
The error occurred because we were trying to use `fetch("/projects.json")` in a server-side React Router loader. The `fetch` function in server-side environments requires a full URL, not a relative path like `/projects.json`.

### **Why This Happened**
- **Server-side context**: React Router loaders run on the server during SSR
- **Relative paths don't work**: Server-side `fetch` needs absolute URLs
- **Missing base URL**: The relative path `/projects.json` couldn't be resolved to a full URL

---

## 📄 **How the File Looked Before**

### **Original Strapi Implementation**
```tsx
// app/routes/projects/index.tsx - BEFORE

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // ❌ PROBLEM: This worked with Strapi because it was a full URL
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projects };
}
```

### **First Attempt (Failed)**
```tsx
// ❌ FAILED ATTEMPT: Using fetch with relative path
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // This fails because fetch needs a full URL in server-side context
  const projectsData = await fetch("/projects.json");
  const json = await projectsData.json();
  
  // ... rest of the code
}
```

---

## ✅ **How I Fixed It**

### **Step 1: Created Data Directory Structure**
```bash
# Created a data directory inside the app folder
mkdir app/data

# Copied the JSON file from public to app/data
copy "public\projects.json" "app\data\projects.json"
```

**Why this approach:**
- **Server-side imports work**: `import()` statements work in server-side loaders
- **Path aliases supported**: Can use `~/data/projects.json` with existing tsconfig paths
- **No network requests**: Direct file import is faster and more reliable
- **TypeScript support**: Full type checking and IntelliSense

### **Step 2: Updated the Loader Function**
```tsx
// ✅ FIXED: Using import() with path alias
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // Load projects from local JSON file using import()
  const projectsData = await import("~/data/projects.json");
  
  const projects = projectsData.data.map((item: any) => ({
    id: item.id.toString(),
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url || "/images/no-image.png",
    url: item.url,
    date: new Date(item.date),
    category: item.category,
    featured: item.featured,
  }));

  return { projects };
}
```

### **Step 3: Enhanced UI with Theme System**
```tsx
// ✅ ENHANCED: Added theme-aware styling
return (
  <section className="bg-primary text-primary min-h-screen py-8">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Projects
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${
              selectedCategory === category 
                ? "bg-accent text-white" 
                : "bg-tertiary text-secondary hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard key={project.id} project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  </section>
);
```

---

## 📁 **How the File Looks After the Fix**

### **Complete Updated Implementation**
```tsx
// app/routes/projects/index.tsx - AFTER

import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Projects } from "~/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects " },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // ✅ SOLUTION: Load projects from local JSON file using import()
  const projectsData = await import("~/data/projects.json");
  
  // Map the data to match our Projects type
  const projects = projectsData.data.map((item: any) => ({
    id: item.id.toString(),                    // Convert number to string
    documentId: item.documentId,               // Keep as string
    title: item.title,                         // Keep as string
    description: item.description,             // Keep as string
    image: item.image?.url || "/images/no-image.png", // Handle missing images
    url: item.url,                             // Keep as string (optional)
    date: new Date(item.date),                 // Convert string to Date object
    category: item.category,                   // Keep as string
    featured: item.featured,                   // Keep as boolean
  }));

  return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Projects[] };

  // Get unique categories for filtering
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <section className="bg-primary text-primary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Projects
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to first page when changing category
              }}
              className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${
                selectedCategory === category 
                  ? "bg-accent text-white" 
                  : "bg-tertiary text-secondary hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProjects.map((project) => (
              <motion.div key={project.id} layout>
                <ProjectCard key={project.id} project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProjectsPage;
```

---

## 🔄 **How to Replicate This Fix in the Future**

### **Step-by-Step Process**

#### **1. Identify the Problem**
- **Error**: "Failed to parse URL from /relative-path"
- **Context**: Server-side loader using `fetch()` with relative paths
- **Cause**: Server-side `fetch` requires absolute URLs

#### **2. Choose the Solution Approach**

**Option A: Use import() with local files (Recommended)**
```tsx
// ✅ BEST: Use import() for local JSON files
const data = await import("~/data/your-file.json");
```

**Option B: Use fetch with full URL**
```tsx
// ✅ ALTERNATIVE: Use fetch with full URL
const url = new URL("/your-file.json", request.url);
const response = await fetch(url);
const data = await response.json();
```

**Option C: Use fs.readFileSync (Node.js only)**
```tsx
// ✅ ALTERNATIVE: Direct file reading (Node.js environments)
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'your-file.json');
const fileContent = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(fileContent);
```

#### **3. Set Up File Structure**
```bash
# Create data directory in app folder
mkdir app/data

# Move or copy JSON files to app/data
cp public/your-data.json app/data/your-data.json
```

#### **4. Update tsconfig.json (if needed)**
```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

#### **5. Update the Loader Function**
```tsx
export async function loader({ request }: Route.LoaderArgs) {
  // Use import() for local files
  const data = await import("~/data/your-file.json");
  
  // Process the data as needed
  const processedData = data.yourArray.map((item: any) => ({
    // Transform your data here
  }));

  return { data: processedData };
}
```

#### **6. Test the Implementation**
```bash
# Run the development server
npm run dev

# Check for errors in console
# Verify data loads correctly
# Test all functionality
```

---

## 🎯 **Key Takeaways**

### **Do's**
- ✅ Use `import()` for local JSON files in server-side loaders
- ✅ Place data files in `app/data/` for server-side access
- ✅ Use path aliases (`~/data/`) for cleaner imports
- ✅ Handle data transformation properly (types, dates, etc.)
- ✅ Add proper error handling and fallbacks

### **Don'ts**
- ❌ Don't use `fetch()` with relative paths in server-side loaders
- ❌ Don't put data files in `public/` if you need server-side access
- ❌ Don't forget to handle data type conversions
- ❌ Don't skip error handling for missing files

### **Best Practices**
1. **File Organization**: Keep data files in `app/data/` for server-side access
2. **Type Safety**: Always type your data transformations
3. **Error Handling**: Add try-catch blocks for file operations
4. **Performance**: Use `import()` for better tree-shaking and performance
5. **Maintainability**: Use consistent naming and structure

---

## 🔧 **Troubleshooting Common Issues**

### **Issue: "Cannot find module" error**
**Solution**: Check that the file exists and the path alias is correct
```bash
# Verify file exists
ls app/data/your-file.json

# Check tsconfig.json has correct paths
cat tsconfig.json | grep paths
```

### **Issue: "Module not found" in production**
**Solution**: Ensure the file is included in the build
```bash
# Check if file is in build output
ls build/server/app/data/
```

### **Issue: Type errors with imported data**
**Solution**: Add proper typing
```tsx
// Define interface for your data
interface YourDataType {
  id: number;
  name: string;
  // ... other properties
}

// Use in import
const data = await import("~/data/your-file.json") as { yourArray: YourDataType[] };
```

This documentation should help you and others replicate this fix for similar issues in the future!
