export class RoleDetailModel {
  id: Number;
  rolename: string;
  roleStatus: boolean;
  roleCategories: RoleCategories;
}

export class RoleCategories {
  categoryName: string;
  permissions: Array<Permission>;
}

export class Permission {
  permissionName: string;
  permissionId: Number;
  selected: boolean;
}
