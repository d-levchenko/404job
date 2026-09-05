import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'JobScape API',
    version: '1.0.0',
    description:
      'JobScape API for authentication, user profiles, vacancies, applications, and lookup options.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local development server',
    },
  ],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['userType', 'email', 'password'],
                properties: {
                  userType: { type: 'string', enum: ['candidate', 'employer'] },
                  name: { type: 'string', minLength: 2, maxLength: 32 },
                  companyName: { type: 'string', minLength: 2, maxLength: 64 },
                  email: { type: 'string', format: 'email', maxLength: 64 },
                  password: {
                    type: 'string',
                    format: 'password',
                    minLength: 8,
                    maxLength: 128,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in and create a session',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: {
                    type: 'string',
                    format: 'password',
                    minLength: 8,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Logged in',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh the current session',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Session refreshed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'session refreshed' },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Log out and clear session cookies',
        security: [{ sessionCookie: [] }],
        responses: { 204: { description: 'Logged out' } },
      },
    },
    '/api/users/me': {
      get: {
        tags: ['Users'],
        summary: 'Get the current user',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Current user',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/users/candidate': {
      patch: {
        tags: ['Users'],
        summary: 'Update the candidate profile',
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                minProperties: 1,
                properties: {
                  name: { type: 'string', minLength: 2, maxLength: 100 },
                  githubUrl: { type: 'string', format: 'uri', nullable: true },
                  linkedinUrl: {
                    type: 'string',
                    format: 'uri',
                    nullable: true,
                  },
                  behanceUrl: { type: 'string', format: 'uri', nullable: true },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Profile updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { data: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/users/employer': {
      patch: {
        tags: ['Users'],
        summary: 'Update the employer profile',
        security: [{ sessionCookie: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  companyName: { type: 'string', minLength: 2, maxLength: 100 },
                  description: { type: 'string', maxLength: 2000 },
                  websiteUrl: { type: 'string', format: 'uri', nullable: true },
                  logo: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Profile updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { data: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/options': {
      get: {
        tags: ['Options'],
        summary: 'Get lookup options',
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              enum: [
                'locations',
                'industries',
                'experienceLevels',
                'employmentTypes',
              ],
            },
          },
        ],
        responses: {
          200: {
            description: 'Option list',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Option' },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/api/vacancies': {
      get: {
        tags: ['Vacancies'],
        summary: 'List vacancies',
        parameters: [
          { $ref: '#/components/parameters/Page' },
          { $ref: '#/components/parameters/PerPage' },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          {
            name: 'industry',
            in: 'query',
            style: 'form',
            explode: true,
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/ObjectId' },
            },
          },
          {
            name: 'experience',
            in: 'query',
            style: 'form',
            explode: true,
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/ObjectId' },
            },
          },
          {
            name: 'location',
            in: 'query',
            style: 'form',
            explode: true,
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/ObjectId' },
            },
          },
          {
            name: 'employmentType',
            in: 'query',
            style: 'form',
            explode: true,
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/ObjectId' },
            },
          },
          {
            name: 'isRemote',
            in: 'query',
            schema: { type: 'string', enum: ['true', 'false'] },
          },
        ],
        responses: {
          200: {
            description: 'Paginated vacancies',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/Pagination' },
                    {
                      type: 'object',
                      properties: {
                        totalVacancies: { type: 'integer' },
                        vacancies: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Vacancy' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
        },
      },
    },
    '/api/vacancies/hot': {
      get: {
        tags: ['Vacancies'],
        summary: 'List hot vacancies',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 4, maximum: 6, default: 6 },
          },
        ],
        responses: {
          200: {
            description: 'Hot vacancies',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Vacancy' },
                },
              },
            },
          },
        },
      },
    },
    '/api/vacancies/favorite': {
      get: {
        tags: ['Vacancies'],
        summary: 'List saved vacancies',
        security: [{ sessionCookie: [] }],
        parameters: [
          { $ref: '#/components/parameters/Page' },
          { $ref: '#/components/parameters/PerPage' },
        ],
        responses: {
          200: {
            description: 'Saved vacancies',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/Pagination' },
                    {
                      type: 'object',
                      properties: {
                        totalSavedVacancies: { type: 'integer' },
                        savedVacancies: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Vacancy' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/api/vacancies/my/vacancies': {
      get: {
        tags: ['Vacancies'],
        summary: 'List the authenticated employer vacancies',
        security: [{ sessionCookie: [] }],
        parameters: [
          { $ref: '#/components/parameters/Page' },
          { $ref: '#/components/parameters/PerPage' },
          {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'closed'] },
          },
        ],
        responses: {
          200: {
            description: 'Employer vacancies',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/Pagination' },
                    {
                      type: 'object',
                      properties: {
                        totalVacancies: { type: 'integer' },
                        vacancies: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Vacancy' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/api/vacancies/my/applications': {
      get: {
        tags: ['Vacancies'],
        summary: 'List applications for the authenticated employer vacancies',
        security: [{ sessionCookie: [] }],
        parameters: [
          { $ref: '#/components/parameters/Page' },
          { $ref: '#/components/parameters/PerPage' },
        ],
        responses: {
          200: {
            description: 'Employer applications',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/Pagination' },
                    {
                      type: 'object',
                      properties: {
                        totalApplications: { type: 'integer' },
                        applications: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Application' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/api/vacancies/create-vacancy': {
      post: {
        tags: ['Vacancies'],
        summary: 'Create a vacancy',
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'description',
                  'requirements',
                  'duties',
                  'weOffer',
                  'industryId',
                  'experienceLevelId',
                  'locationId',
                  'employmentTypeId',
                  'isRemote',
                ],
                properties: {
                  title: { type: 'string', minLength: 5, maxLength: 256 },
                  description: {
                    type: 'string',
                    minLength: 50,
                    maxLength: 4000,
                  },
                  requirements: {
                    type: 'string',
                    minLength: 50,
                    maxLength: 4000,
                  },
                  duties: { type: 'string', minLength: 50, maxLength: 4000 },
                  plusWillBe: { type: 'string', maxLength: 4000 },
                  weOffer: { type: 'string', minLength: 50, maxLength: 4000 },
                  salaryRange: { type: 'string' },
                  industryId: { $ref: '#/components/schemas/ObjectId' },
                  experienceLevelId: { $ref: '#/components/schemas/ObjectId' },
                  locationId: { $ref: '#/components/schemas/ObjectId' },
                  employmentTypeId: { $ref: '#/components/schemas/ObjectId' },
                  isRemote: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Vacancy created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Vacancy' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/api/vacancies/{vacancyId}': {
      parameters: [{ $ref: '#/components/parameters/VacancyId' }],
      get: {
        tags: ['Vacancies'],
        summary: 'Get a vacancy and similar vacancies',
        responses: {
          200: {
            description: 'Vacancy details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    vacancy: { $ref: '#/components/schemas/Vacancy' },
                    similarVacancies: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Vacancy' },
                    },
                  },
                },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/vacancies/{vacancyId}/favorite': {
      parameters: [{ $ref: '#/components/parameters/VacancyId' }],
      post: {
        tags: ['Vacancies'],
        summary: 'Save a vacancy to favorites',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Vacancy saved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    savedVacancies: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Vacancy' },
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        tags: ['Vacancies'],
        summary: 'Remove a vacancy from favorites',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Vacancy removed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    savedVacancies: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Vacancy' },
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/vacancies/{vacancyId}/apply': {
      parameters: [{ $ref: '#/components/parameters/VacancyId' }],
      post: {
        tags: ['Vacancies'],
        summary: 'Apply to a vacancy',
        security: [{ sessionCookie: [] }],
        responses: {
          201: {
            description: 'Application submitted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    application: { $ref: '#/components/schemas/Application' },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/vacancies/{vacancyId}/close': {
      parameters: [{ $ref: '#/components/parameters/VacancyId' }],
      patch: {
        tags: ['Vacancies'],
        summary: 'Close a vacancy',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Vacancy closed',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Vacancy' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        tags: ['Vacancies'],
        summary: 'Close a vacancy (legacy method)',
        security: [{ sessionCookie: [] }],
        responses: {
          200: {
            description: 'Vacancy closed',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Vacancy' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/vacancies/applications/{applicationId}/status': {
      parameters: [{ $ref: '#/components/parameters/ApplicationId' }],
      patch: {
        tags: ['Vacancies'],
        summary: 'Update an application status',
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: {
                    type: 'string',
                    enum: ['reviewed', 'accepted', 'rejected'],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Application status updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    application: { $ref: '#/components/schemas/Application' },
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Registration and session management' },
    { name: 'Users', description: 'Current user profile operations' },
    { name: 'Vacancies', description: 'Vacancy and application operations' },
    { name: 'Options', description: 'Lookup values used by the client' },
  ],
  components: {
    securitySchemes: {
      sessionCookie: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
        description:
          'Authentication is established by the accessToken, refreshToken, and sessionId cookies returned by auth endpoints.',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 400 },
          message: { type: 'string', example: 'Validation failed' },
        },
      },
      ObjectId: {
        type: 'string',
        pattern: '^[a-fA-F0-9]{24}$',
        example: '507f1f77bcf86cd799439011',
      },
      User: {
        type: 'object',
        required: ['_id', 'userType', 'email'],
        properties: {
          _id: { $ref: '#/components/schemas/ObjectId' },
          userType: { type: 'string', enum: ['candidate', 'employer'] },
          name: { type: 'string', example: 'Jane Doe' },
          companyName: { type: 'string', example: 'Acme Inc.' },
          email: {
            type: 'string',
            format: 'email',
            example: 'jane@example.com',
          },
          githubUrl: { type: 'string', format: 'uri', nullable: true },
          linkedinUrl: { type: 'string', format: 'uri', nullable: true },
          behanceUrl: { type: 'string', format: 'uri', nullable: true },
          logo: { type: 'string', format: 'uri' },
          description: { type: 'string' },
          websiteUrl: { type: 'string', format: 'uri' },
          savedVacancies: {
            type: 'array',
            items: { $ref: '#/components/schemas/Vacancy' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Option: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/ObjectId' },
          name: { type: 'string', example: 'Frontend' },
        },
      },
      Vacancy: {
        type: 'object',
        required: ['_id', 'title', 'isRemote', 'status'],
        properties: {
          _id: { $ref: '#/components/schemas/ObjectId' },
          employerId: { $ref: '#/components/schemas/User' },
          title: { type: 'string', example: 'Senior Frontend Developer' },
          description: { type: 'string' },
          requirements: { type: 'string' },
          duties: { type: 'string' },
          plusWillBe: { type: 'string' },
          weOffer: { type: 'string' },
          industryId: {
            oneOf: [
              { $ref: '#/components/schemas/ObjectId' },
              { $ref: '#/components/schemas/Option' },
            ],
          },
          experienceLevelId: {
            oneOf: [
              { $ref: '#/components/schemas/ObjectId' },
              { $ref: '#/components/schemas/Option' },
            ],
          },
          locationId: {
            oneOf: [
              { $ref: '#/components/schemas/ObjectId' },
              { $ref: '#/components/schemas/Option' },
            ],
          },
          employmentTypeId: {
            oneOf: [
              { $ref: '#/components/schemas/ObjectId' },
              { $ref: '#/components/schemas/Option' },
            ],
          },
          isRemote: { type: 'boolean' },
          status: { type: 'string', enum: ['active', 'closed'] },
          salaryRange: { type: 'string', example: '$2,000 - $3,000' },
          hotVacancy: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Application: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/ObjectId' },
          vacancyId: { $ref: '#/components/schemas/ObjectId' },
          candidateId: { $ref: '#/components/schemas/ObjectId' },
          resumeUrl: { type: 'string', format: 'uri' },
          resumeName: { type: 'string' },
          status: {
            type: 'string',
            enum: ['pending', 'reviewed', 'accepted', 'rejected'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, example: 1 },
          perPage: { type: 'integer', minimum: 1, example: 10 },
          totalPages: { type: 'integer', example: 3 },
        },
      },
    },
    parameters: {
      VacancyId: {
        name: 'vacancyId',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/ObjectId' },
      },
      ApplicationId: {
        name: 'applicationId',
        in: 'path',
        required: true,
        schema: { $ref: '#/components/schemas/ObjectId' },
      },
      Page: {
        name: 'page',
        in: 'query',
        schema: { type: 'integer', minimum: 1, default: 1 },
      },
      PerPage: {
        name: 'perPage',
        in: 'query',
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
      },
    },
    responses: {
      BadRequest: {
        description: 'Invalid request data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      Unauthorized: {
        description: 'Authentication is required or the session is invalid',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      Forbidden: {
        description: 'The authenticated user cannot perform this operation',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
