/**
 * ProyekApp Apps Script Template
 * File name in Apps Script: Code.gs
 *
 * Use this as a reusable template for every new project.
 * The dashboard Project Setup page sends Drive folder IDs to this script,
 * so you normally do not need to edit folder IDs inside this code.
 *
 * Supported actions:
 * - ping
 * - saveConfig
 * - testConfig
 * - getConfig
 * - syncFiles
 * - getReports
 * - getMedia
 */

const CONFIG_KEY = 'PROYEKAPP_PROJECT_CONFIG';
const DEFAULT_MAX_FILES_PER_FOLDER = 80;

function doGet(e) {
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const action = String(params.action || 'ping').trim();

  try {
    let result;

    switch (action) {
      case 'ping':
        result = {
          ok: true,
          status: 'success',
          message: 'Apps Script is connected.',
          timestamp: new Date().toISOString(),
        };
        break;

      case 'saveConfig':
        result = saveConfig_(params);
        break;

      case 'testConfig':
        result = testConfig_(params);
        break;

      case 'getConfig':
        result = {
          ok: true,
          status: 'success',
          config: getStoredConfig_(),
        };
        break;

      case 'syncFiles':
        result = syncFiles_(params);
        break;

      case 'getReports':
        result = getReports_(params);
        break;

      case 'getMedia':
        result = getMedia_(params);
        break;

      default:
        result = {
          ok: false,
          status: 'error',
          error: 'Unknown action: ' + action,
        };
    }

    return output_(result, params.callback);
  } catch (err) {
    return output_({
      ok: false,
      status: 'error',
      error: err && err.message ? err.message : String(err),
    }, params.callback);
  }
}

function saveConfig_(params) {
  const config = parseConfigParam_(params.config);

  if (!config || typeof config !== 'object') {
    throw new Error('Config is empty or invalid.');
  }

  const normalized = normalizeConfig_(config);
  normalized.updated_at = new Date().toISOString();

  PropertiesService.getScriptProperties().setProperty(CONFIG_KEY, JSON.stringify(normalized));

  return {
    ok: true,
    status: 'success',
    message: 'Config saved.',
    updated_at: normalized.updated_at,
  };
}

function testConfig_(params) {
  const incoming = params.config ? parseConfigParam_(params.config) : null;
  const config = normalizeConfig_(incoming || getStoredConfig_());
  const folders = collectFoldersForTest_(config);

  const checks = folders.map((item) => {
    try {
      const folder = DriveApp.getFolderById(item.folderId);
      return {
        label: item.label,
        folderId: item.folderId,
        ok: true,
        name: folder.getName(),
      };
    } catch (err) {
      return {
        label: item.label,
        folderId: item.folderId,
        ok: false,
        error: err && err.message ? err.message : String(err),
      };
    }
  });

  const valid = checks.filter((item) => item.ok).length;
  const total = checks.length;

  return {
    ok: true,
    status: 'success',
    valid,
    total,
    invalid: total - valid,
    checks,
  };
}

function syncFiles_(params) {
  const config = getStoredConfig_();
  const categories = getActiveDocumentCategories_(config);
  const files = [];
  const folderErrors = [];
  const syncedCategories = [];

  categories.forEach((category) => {
    if (!category.folderId) return;

    try {
      const folder = DriveApp.getFolderById(category.folderId);
      syncedCategories.push(category.name);
      const folderFiles = listFilesInFolder_(folder, category.name, DEFAULT_MAX_FILES_PER_FOLDER);
      files.push.apply(files, folderFiles);
    } catch (err) {
      folderErrors.push({
        category: category.name,
        folderId: category.folderId,
        error: err && err.message ? err.message : String(err),
      });
    }
  });

  files.sort((a, b) => String(b.drive_updated_at || '').localeCompare(String(a.drive_updated_at || '')));

  return {
    ok: true,
    status: 'success',
    files,
    syncedCategories,
    folderErrors,
    generated_at: new Date().toISOString(),
  };
}

function getReports_(params) {
  const config = getStoredConfig_();
  let rkmFolderId = extractDriveId_(params.rkmFolderId || '');

  if (!rkmFolderId && config.reportFolders) {
    rkmFolderId = extractDriveId_(config.reportFolders.kontraktor || '');
  }

  if (!rkmFolderId) {
    const rkmCategory = getActiveDocumentCategories_(config).find((cat) => {
      const name = String(cat.name || '').toLowerCase();
      const id = String(cat.id || '').toLowerCase();
      return id === 'rkm' || name === 'rkm' || name.indexOf('rapat kerja mingguan') >= 0;
    });
    rkmFolderId = extractDriveId_(rkmCategory && rkmCategory.folderId ? rkmCategory.folderId : '');
  }

  if (!rkmFolderId) {
    return {
      ok: true,
      status: 'success',
      report_kontraktor: null,
      rkm: null,
      message: 'RKM folder is not configured.',
    };
  }

  const folder = DriveApp.getFolderById(rkmFolderId);
  const latest = getLatestFileInFolder_(folder);
  const report = latest ? buildReportObject_(latest) : null;

  return {
    ok: true,
    status: 'success',
    report_kontraktor: report,
    rkm: report,
  };
}

function getMedia_(params) {
  const config = getStoredConfig_();
  const mediaFolders = config.mediaFolders || {};

  const photos = listMediaFolder_(mediaFolders.photo, 'photo');
  const videos = listMediaFolder_(mediaFolders.video, 'video');
  const sketchups = listMediaFolder_(mediaFolders.sketchup, 'sketchup');

  return {
    ok: true,
    status: 'success',
    photos,
    foto: photos,
    images: photos,
    videos,
    videoList: videos,
    sketchups,
    models: sketchups,
    generated_at: new Date().toISOString(),
  };
}

function listMediaFolder_(folderIdOrUrl, type) {
  const folderId = extractDriveId_(folderIdOrUrl || '');
  if (!folderId) return [];

  try {
    const folder = DriveApp.getFolderById(folderId);
    const category = type === 'photo' ? 'Foto' : type === 'video' ? 'Video' : 'SketchUp / 3D';
    return listFilesInFolder_(folder, category, DEFAULT_MAX_FILES_PER_FOLDER).map((file) => {
      const item = {
        id: file.id,
        name: file.title,
        title: file.title,
        caption: file.title,
        folder: folder.getName(),
        mime: file.mime,
        url: file.url,
        viewUrl: file.url,
        rawUrl: file.url,
        embedUrl: file.embedUrl,
        date: file.drive_updated_at,
      };

      if (type === 'photo') {
        item.thumbnailUrl = file.thumbnailUrl;
        item.imageUrl = file.thumbnailUrl;
      }

      return item;
    });
  } catch (err) {
    return [];
  }
}

function listFilesInFolder_(folder, categoryName, limit) {
  const out = [];
  const files = folder.getFiles();

  while (files.hasNext() && out.length < limit) {
    const file = files.next();
    out.push(buildFileObject_(file, categoryName));
  }

  out.sort((a, b) => String(b.drive_updated_at || '').localeCompare(String(a.drive_updated_at || '')));
  return out;
}

function getLatestFileInFolder_(folder) {
  const files = folder.getFiles();
  let latest = null;
  let latestTime = -1;

  while (files.hasNext()) {
    const file = files.next();
    const time = file.getLastUpdated() ? file.getLastUpdated().getTime() : 0;
    if (time > latestTime) {
      latest = file;
      latestTime = time;
    }
  }

  return latest;
}

function buildFileObject_(file, categoryName) {
  const id = file.getId();
  const createdAt = file.getDateCreated() ? file.getDateCreated().toISOString() : new Date().toISOString();
  const updatedAt = file.getLastUpdated() ? file.getLastUpdated().toISOString() : createdAt;
  const mime = file.getMimeType() || '';

  return {
    id,
    drive_file_id: id,
    title: file.getName(),
    name: file.getName(),
    category: categoryName,
    mime,
    url: file.getUrl(),
    viewUrl: file.getUrl(),
    embedUrl: 'https://drive.google.com/file/d/' + id + '/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1600',
    created_at: createdAt,
    updated_at: updatedAt,
    drive_created_at: createdAt,
    drive_updated_at: updatedAt,
  };
}

function buildReportObject_(file) {
  const id = file.getId();
  const updatedAt = file.getLastUpdated() ? file.getLastUpdated().toISOString() : new Date().toISOString();

  return {
    id,
    name: file.getName(),
    title: file.getName(),
    date: Utilities.formatDate(file.getLastUpdated() || new Date(), Session.getScriptTimeZone(), 'dd MMM yyyy, HH:mm'),
    viewUrl: file.getUrl(),
    url: file.getUrl(),
    embedUrl: 'https://drive.google.com/file/d/' + id + '/preview',
    updated_at: updatedAt,
    drive_updated_at: updatedAt,
  };
}

function getStoredConfig_() {
  const raw = PropertiesService.getScriptProperties().getProperty(CONFIG_KEY);
  if (!raw) return {};

  try {
    return normalizeConfig_(JSON.parse(raw));
  } catch (err) {
    return {};
  }
}

function parseConfigParam_(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error('Invalid config JSON: ' + err.message);
  }
}

function normalizeConfig_(config) {
  const input = config || {};
  const output = {
    projectName: input.projectName || 'Proyek Dashboard',
    mediaFolders: normalizeFolderMap_(input.mediaFolders || {}),
    reportFolders: normalizeFolderMap_(input.reportFolders || {}),
    mailFolders: normalizeFolderMap_(input.mailFolders || {}),
    documentFolders: normalizeFolderMap_(input.documentFolders || {}),
    documentCategories: [],
  };

  if (Array.isArray(input.documentCategories)) {
    output.documentCategories = input.documentCategories.map((cat, idx) => ({
      id: cat.id || slugify_(cat.name || ('kategori-' + (idx + 1))),
      name: cat.name || ('Kategori ' + (idx + 1)),
      badge: cat.badge || String(cat.name || 'DOC').slice(0, 4).toUpperCase(),
      color: cat.color || 'slate',
      active: cat.active !== false,
      order: Number(cat.order || idx + 1),
      folderId: extractDriveId_(cat.folderId || cat.folderUrl || ''),
    })).filter((cat) => cat.name);
  }

  Object.keys(output.documentFolders || {}).forEach((name, idx) => {
    const exists = output.documentCategories.some((cat) => cat.name === name);
    if (!exists) {
      output.documentCategories.push({
        id: slugify_(name),
        name,
        badge: String(name).slice(0, 4).toUpperCase(),
        color: 'slate',
        active: true,
        order: output.documentCategories.length + 1,
        folderId: output.documentFolders[name],
      });
    }
  });

  return output;
}

function normalizeFolderMap_(map) {
  const output = {};
  Object.keys(map || {}).forEach((key) => {
    output[key] = extractDriveId_(map[key]);
  });
  return output;
}

function collectFoldersForTest_(config) {
  const out = [];

  Object.keys(config.mediaFolders || {}).forEach((key) => {
    const folderId = extractDriveId_(config.mediaFolders[key]);
    if (folderId) out.push({ label: 'Media - ' + key, folderId });
  });

  Object.keys(config.reportFolders || {}).forEach((key) => {
    const folderId = extractDriveId_(config.reportFolders[key]);
    if (folderId) out.push({ label: 'Report - ' + key, folderId });
  });

  getActiveDocumentCategories_(config).forEach((cat) => {
    if (cat.folderId) out.push({ label: 'Dokumen - ' + cat.name, folderId: cat.folderId });
  });

  Object.keys(config.mailFolders || {}).forEach((key) => {
    const folderId = extractDriveId_(config.mailFolders[key]);
    if (folderId) out.push({ label: 'Surat - ' + key, folderId });
  });

  return out;
}

function getActiveDocumentCategories_(config) {
  const normalized = normalizeConfig_(config || {});
  return (normalized.documentCategories || [])
    .filter((cat) => cat.active !== false && cat.folderId)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function extractDriveId_(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  const patterns = [
    /\/folders\/([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /\/document\/d\/([a-zA-Z0-9_-]+)/,
    /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
    /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{20,})$/,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const match = raw.match(patterns[i]);
    if (match && match[1]) return match[1];
  }

  return raw;
}

function slugify_(value) {
  return String(value || 'kategori')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'kategori';
}

function output_(payload, callback) {
  const json = JSON.stringify(payload || {});

  if (callback) {
    const safeCallback = String(callback).replace(/[^a-zA-Z0-9_.$]/g, '');
    return ContentService
      .createTextOutput(safeCallback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
