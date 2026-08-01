import { SummarizeService } from "../summarise.service";
import { MockAIProvider } from "@/infrastructure/ai/mock-provider";
import { ValidationError } from "@/core/errors/app-error";

describe("SummarizeService (Unit Tests)", () => {
  let service: SummarizeService;
  let mockProvider: MockAIProvider;

  beforeEach(() => {
    mockProvider = new MockAIProvider();
    service = new SummarizeService(mockProvider);
  });

  it("geçerli bir metin verildiğinde başarıyla özet döndürmelidir", async () => {
    const validText =
      "Yapay zeka teknolojileri son yıllarda büyük bir ivme kazandı. Şirketler artık yapay zekayı sadece araştırma projelerinde değil, günlük operasyonel süreçlerinde de aktif olarak kullanmaktadır. Bu durum verimliliği ciddi oranda artırmaktadır.";

    const result = await service.execute(validText);

    expect(result).toBeDefined();
    expect(result.title).toContain("Test Title");
    expect(result.summary.length).toBeGreaterThan(0);
    expect(result.sentiment).toBe("POSITIVE");
  });

  it("50 karakterden kısa metin verildiğinde ValidationError fırlatmalıdır", async () => {
    const shortText = "Çok kısa metin.";

    await expect(service.execute(shortText)).rejects.toThrow(ValidationError);
  });

  it("boş metin veya sadece boşluk verildiğinde hata fırlatmalıdır", async () => {
    const emptyText = "   ";

    await expect(service.execute(emptyText)).rejects.toThrow(ValidationError);
  });
});