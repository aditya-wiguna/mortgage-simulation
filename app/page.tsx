'use client'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useFieldArray, useForm } from "react-hook-form"
import { Toast } from "@/components/ui/toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Input
} from "@/components/ui/input"

import {
  InputMoney
} from "@/components/ui/input-money"

import {
  Button
} from "@/components/ui/button"

const simulatorFormSchema = z.object({
  price: z
    .string({
      required_error: "Masukan nominal penghasilan anda.",
    }),
  tenor: z
    .number({
      required_error: "Masukan jangka waktu kredit anda.",
    })
    .min(1, "Jangka waktu kredit minimal 1 tahun.")
    .max(25, "Jangka waktu kredit maksimal 25 tahun."),
  interest_rate: z.string({
    required_error: "Masukan suku bunga kredit anda.",
  }),
  other_loan: z.string().optional(),
  down_payment: z.string({
    required_error: "Masukan uang muka anda.",
  }),
})

type SimulationFormValues = z.infer<typeof simulatorFormSchema>

const defaultValues: Partial<SimulationFormValues> = {}

export default function Home() {
  const form = useForm<SimulationFormValues>({
    resolver: zodResolver(simulatorFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: SimulationFormValues) {
  }

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Simulasi KPR Indonesia</h2>
        <p className="text-muted-foreground">
          Kalkulator simulasi perhitungan KPR mulai dari bunga, cicilan perbulan hingga total biaya selama mencicil.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Rumah</FormLabel>
                    <FormControl>
                      <InputMoney placeholder="100.000.000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukan harga rumah yang ingin anda cari / beli.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="down_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uang Muka</FormLabel>
                    <FormControl>
                      <InputMoney placeholder="100.000.000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukan uang muka yang sudah anda siapkan, rekomendasi 30% dari harga rumah.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other_loan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cicilan Lainnya</FormLabel>
                    <FormControl>
                      <InputMoney placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Jika anda memiliki cicilan lainnya, masukan nilai angsurannya.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jangka Waktu / Tenor</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Jangka waktu kredit, sesuai dengan peraturan yang ada saat ini maksimal 25 tahun.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interest_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suku Bunga Kredit</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Hitung Simulasi Kredit</Button>
            </form>
          </Form>
        </div>
        <div className="flex-1 lg:max-w-2xl">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">Angsuran</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">Uang Muka</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">Pokok Hutang</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">Minimum Pendapatan</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">(Est) Biaya Provisi</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-0.5 my-5">
                <p className="text-muted-foreground">(Est) Biaya Administrasi</p>
                <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
              </div>
            </div>
          </div>

          <div className="space-y-0.5 my-5">
            <p className="text-muted-foreground">(Est) Total Biaya</p>
            <h4 className="text-2xl font-bold tracking-tight">Rp 2.555.000</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
