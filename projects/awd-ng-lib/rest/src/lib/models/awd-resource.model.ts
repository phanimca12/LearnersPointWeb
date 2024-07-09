export interface IAwdResource {
  id: string;
  type: string;
  application: string;
  platform: string;
  parameters: string;
  href: string;
  name?: string;
  access?: string;
  resources?: IAwdResource[];
}
