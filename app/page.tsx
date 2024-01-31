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
  Button 
} from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const simulatorFormSchema = z.object({
  income: z
    .number({
      required_error: "Masukan nominal penghasilan anda.",
    }),
  tenor: z
    .number({
      required_error: "Masukan jangka waktu kredit anda.",
    })
    .min(1, "Jangka waktu kredit minimal 1 tahun.")
    .max(25, "Jangka waktu kredit maksimal 25 tahun."),
  interest_rate: z.number({
    required_error: "Masukan suku bunga kredit anda.",
  }),
  occupation: z.enum(["employee", "entrepreneur"]),
  other_loan: z.number().optional(),
  down_payment: z.number({
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
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pendapatan / Gaji</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukan rata - rata pendapatan anda selama 3 bulan terakhir.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pekerjaan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pekerjaan Saat Ini" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employee">Karyawan</SelectItem>
                        <SelectItem value="entrepreneur">Pengusaha</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Hitung Simulasi Kredit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
