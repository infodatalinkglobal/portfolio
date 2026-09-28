import { blogPost } from "./blogPost";
import { codeBlock } from "./codeBlock";
import { project } from "./project";

/** All document + portable-text object types, registered in sanity.config.ts. */
export const schemaTypes = [project, blogPost, codeBlock];
