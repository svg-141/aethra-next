import { 
  User, 
  AuthCredentials, 
  RegisterData, 
  LoginResponse, 
  ValidationResult, 
  PasswordResetRequest, 
  PasswordReset 
} from '../types/auth.types';

// Simulación de base de datos de usuarios
let usersDatabase: User[] = [];
let sessionsDatabase: Map<string, { userId: string; token: string; expiresAt: Date }> = new Map();

export class AuthService {
  // Inicializar con usuarios de ejemplo
  static initializeWithSampleUsers(): void {
    if (usersDatabase.length > 0) return;

    const sampleUsers: User[] = [
      {
        id: 'user1',
        email: 'gamer@example.com',
        username: 'GamerPro123',
        displayName: 'Gamer Pro',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 15,
        reputation: 1250,
        joinDate: new Date('2023-01-15'),
        lastActive: new Date(),
        badges: ['Experto en Valorant', 'Miembro Veterano'],
        preferences: {
          notifications: { email: true, push: true, inApp: true },
          privacy: { showEmail: false, showLevel: true, showActivity: true },
          theme: 'aethra-purple',
          language: 'es'
        },
        isActive: true,
        isVerified: true,
        role: 'user'
      },
      {
        id: 'user2',
        email: 'lolplayer@example.com',
        username: 'LoLPlayer',
        displayName: 'LoL Player',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        level: 8,
        reputation: 680,
        joinDate: new Date('2023-06-10'),
        lastActive: new Date(),
        badges: ['Analista LoL'],
        preferences: {
          notifications: { email: true, push: false, inApp: true },
          privacy: { showEmail: false, showLevel: true, showActivity: false },
          theme: 'cyber-blue',
          language: 'es'
        },
        isActive: true,
        isVerified: true,
        role: 'user'
      },
      {
        id: 'admin1',
        email: 'admin@aethra.com',
        username: 'AethraAdmin',
        displayName: 'Administrador',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        level: 50,
        reputation: 5000,
        joinDate: new Date('2022-01-01'),
        lastActive: new Date(),
        badges: ['Fundador', 'Administrador', 'Experto IA'],
        preferences: {
          notifications: { email: true, push: true, inApp: true },
          privacy: { showEmail: false, showLevel: true, showActivity: true },
          theme: 'aethra-purple',
          language: 'es'
        },
        isActive: true,
        isVerified: true,
        role: 'admin'
      }
    ];

    usersDatabase = sampleUsers;
  }

  // Registrar nuevo usuario
  static async register(data: RegisterData): Promise<LoginResponse> {
    await this.delay(800);

    // Validar datos
    const validation = this.validateRegisterData(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.map(e => e.message).join(', '));
    }

    // Verificar si el usuario ya existe
    const existingUser = usersDatabase.find(u => 
      u.email.toLowerCase() === data.email.toLowerCase() || 
      u.username.toLowerCase() === data.username.toLowerCase()
    );

    if (existingUser) {
      if (existingUser.email.toLowerCase() === data.email.toLowerCase()) {
        throw new Error('Ya existe una cuenta con este email');
      }
      if (existingUser.username.toLowerCase() === data.username.toLowerCase()) {
        throw new Error('El nombre de usuario ya está en uso');
      }
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email.toLowerCase(),
      username: data.username,
      displayName: data.displayName,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      level: 1,
      reputation: 0,
      joinDate: new Date(),
      lastActive: new Date(),
      badges: ['Nuevo Miembro'],
      preferences: {
        notifications: { email: true, push: true, inApp: true },
        privacy: { showEmail: false, showLevel: true, showActivity: true },
        theme: 'aethra-purple',
        language: 'es'
      },
      isActive: true,
      isVerified: false,
      role: 'user'
    };

    usersDatabase.push(newUser);

    // Crear sesión
    const token = this.generateToken();
    const refreshToken = this.generateToken();
    const expiresIn = 24 * 60 * 60 * 1000; // 24 horas

    sessionsDatabase.set(token, {
      userId: newUser.id,
      token,
      expiresAt: new Date(Date.now() + expiresIn)
    });

    return {
      user: newUser,
      token,
      refreshToken,
      expiresIn
    };
  }

  // Iniciar sesión
  static async login(credentials: AuthCredentials): Promise<LoginResponse> {
    await this.delay(600);

    // Validar credenciales
    const validation = this.validateLoginCredentials(credentials);
    if (!validation.isValid) {
      throw new Error(validation.errors.map(e => e.message).join(', '));
    }

    // Buscar usuario
    const user = usersDatabase.find(u => 
      u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    if (!user.isActive) {
      throw new Error('Tu cuenta ha sido desactivada. Contacta al soporte');
    }

    // Simular validación de contraseña (en producción usar bcrypt)
    if (!this.validatePassword(credentials.password)) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Actualizar última actividad
    user.lastActive = new Date();

    // Crear sesión
    const token = this.generateToken();
    const refreshToken = this.generateToken();
    const expiresIn = 24 * 60 * 60 * 1000; // 24 horas

    sessionsDatabase.set(token, {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + expiresIn)
    });

    return {
      user,
      token,
      refreshToken,
      expiresIn
    };
  }

  // Obtener usuario por token
  static async getUserByToken(token: string): Promise<User | null> {
    await this.delay(100);

    const session = sessionsDatabase.get(token);
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        sessionsDatabase.delete(token);
      }
      return null;
    }

    const user = usersDatabase.find(u => u.id === session.userId);
    if (!user || !user.isActive) {
      sessionsDatabase.delete(token);
      return null;
    }

    // Actualizar última actividad
    user.lastActive = new Date();

    return user;
  }

  // Cerrar sesión
  static async logout(token: string): Promise<void> {
    await this.delay(200);
    sessionsDatabase.delete(token);
  }

  // Actualizar perfil de usuario
  static async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await this.delay(400);

    const userIndex = usersDatabase.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    // Validar updates permitidos
    const allowedFields = ['displayName', 'avatar', 'preferences'];
    const sanitizedUpdates = Object.keys(updates).reduce((acc, key) => {
      if (allowedFields.includes(key) && updates[key as keyof User] !== undefined) {
        acc[key as keyof User] = updates[key as keyof User] as any;
      }
      return acc;
    }, {} as Partial<User>);

    // Aplicar updates
    usersDatabase[userIndex] = {
      ...usersDatabase[userIndex],
      ...sanitizedUpdates
    };

    return usersDatabase[userIndex];
  }

  // Solicitar restablecimiento de contraseña
  static async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await this.delay(500);

    const user = usersDatabase.find(u => 
      u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (!user) {
      // Por seguridad, no revelar si el email existe
      return;
    }

    // En producción, enviar email con token de reset
    console.log(`Password reset requested for user: ${user.email}`);
  }

  // Restablecer contraseña
  static async resetPassword(data: PasswordReset): Promise<void> {
    await this.delay(400);

    // En producción, validar token de reset
    const validation = this.validatePassword(data.newPassword);
    if (!validation) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    // Simular actualización de contraseña
    console.log('Password reset completed');
  }

  // Obtener todos los usuarios (solo admin)
  static async getAllUsers(requesterId: string): Promise<User[]> {
    const requester = usersDatabase.find(u => u.id === requesterId);
    if (!requester || requester.role !== 'admin') {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    await this.delay(300);
    return usersDatabase;
  }

  // Verificar permisos de usuario
  static getUserPermissions(userId: string | null, resourceOwnerId?: string) {
    const user = userId ? usersDatabase.find(u => u.id === userId) : null;
    
    return {
      canEdit: (targetUserId: string) => {
        if (!user) return false;
        return user.id === targetUserId || user.role === 'admin' || user.role === 'moderator';
      },
      canDelete: (targetUserId: string) => {
        if (!user) return false;
        return user.id === targetUserId || user.role === 'admin';
      },
      canModerate: () => {
        if (!user) return false;
        return user.role === 'moderator' || user.role === 'admin';
      },
      canAdmin: () => {
        if (!user) return false;
        return user.role === 'admin';
      },
      isOwner: (targetUserId: string) => {
        if (!user) return false;
        return user.id === targetUserId;
      }
    };
  }

  // Validaciones
  private static validateRegisterData(data: RegisterData): ValidationResult {
    const errors: any[] = [];

    // Email
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }

    // Username
    if (!data.username || data.username.length < 3 || data.username.length > 20) {
      errors.push({ field: 'username', message: 'El nombre de usuario debe tener entre 3 y 20 caracteres' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
      errors.push({ field: 'username', message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' });
    }

    // Password
    if (!data.password || data.password.length < 8) {
      errors.push({ field: 'password', message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Display Name
    if (!data.displayName || data.displayName.length < 2 || data.displayName.length > 50) {
      errors.push({ field: 'displayName', message: 'El nombre debe tener entre 2 y 50 caracteres' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateLoginCredentials(credentials: AuthCredentials): ValidationResult {
    const errors: any[] = [];

    if (!credentials.email || !this.isValidEmail(credentials.email)) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }

    if (!credentials.password) {
      errors.push({ field: 'password', message: 'La contraseña es requerida' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static validatePassword(password: string): boolean {
    return password && password.length >= 8;
  }

  private static generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Auto-inicializar
AuthService.initializeWithSampleUsers();

// Limpiar sesiones expiradas cada hora
setInterval(() => {
  const now = new Date();
  for (const [token, session] of sessionsDatabase.entries()) {
    if (session.expiresAt < now) {
      sessionsDatabase.delete(token);
    }
  }
}, 60 * 60 * 1000);