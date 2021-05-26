export interface ParentService {
  checkAdminUserEmail(email: string): Promise<boolean>;
}
