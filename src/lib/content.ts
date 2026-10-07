import { listItems } from './db';
import type { Project } from '../data/projects';
import type { Service } from '../data/services';
import type { Solution } from '../data/solutions';
import type { Client } from '../data/clients';

// Public pages read through these so admin edits show up immediately.
export const getProjects = () => listItems<Project>('projects');
export const getServices = () => listItems<Service>('services');
export const getSolutions = () => listItems<Solution>('solutions');
export const getClients = () => listItems<Client>('clients');
